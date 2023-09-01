'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { AiOutlineSearch, AiOutlineFileText, AiOutlineShareAlt, AiOutlineStar, AiFillStar, AiOutlineEdit } from 'react-icons/ai';
import {FaClone, FaRegClone} from 'react-icons/fa';
import {HiOutlineUserCircle} from 'react-icons/hi';
import { SafePost, SafeUser } from "@/app/types";
import moment from 'moment';
import Link from "next/link";
import LikeButton from "@/app/components/LikeButton";
import useConfirmationModal from "@/app/hooks/useConfirmationModal";
import CloneConfirmationModal from "@/app/components/modals/CloneConfirmationModal";
import 'suneditor/dist/css/suneditor.min.css';
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

import SunEditorCore from "suneditor/src/lib/core";
import { VscFile } from "react-icons/vsc";


interface PostClientProps {
    post: SafePost;
    currentUser?: SafeUser | null;
    isMobileView?: RegExpMatchArray;
}


const PostClient : React.FC<PostClientProps> = ({
    post,
    currentUser,
    isMobileView
}) => {
    console.log("Parent:", post.parentPostId, post);
    const [isFavourite, setIsFavourite] = useState(false);
    const files = post.uploadFiles;

    const [isCloned, setIsCloned] = useState(false);
    const [parentPost, setParentPost] = useState<SafePost | null>(null);

    const cloneConfirmationModal = useConfirmationModal();

    const handleError = () => {
        toast.error("You cannot edit this post in mobile view");
    }

    console.log("authorID: ", post.authorId);
    console.log("currentUserID: ", currentUser?.id);

    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
    }

    const handleCloneAction = () => {
        toast("You have already cloned this post");
    }

    const handleClone = () => {
        const data = {
            postID: post.postID
        }
        toast.promise(
            axios.post(`/api/clonePost`, data),
            {
                loading: 'Cloning post...',
                success: 'Post cloned successfully',
                error: 'Error cloning post'
            }
        ).then((res) => {
            console.log(res.data);
            redirect('/upload');
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        const data = {
            postID: post.postID
        }
        axios.post("/api/views", data ).then((res) => {
            // print the response status and data
            console.log("Viewed Post");
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        
        if (post.authorId !== currentUser?.id) {
            const data = {
                currentUserID: currentUser?.id,
                authorID: post.authorId,
                parentPostID: post.postID
            }

            axios.post("/api/checkCloneStatus", data).then((res) => {
                if (res.data.length > 0) {
                    setIsCloned(true);
                    console.log("Parent Post: ", res.data);
                    setParentPost(res.data);
                }
            })
        } else {
            if(post.parentPostAuthorId !== null) {
                setIsCloned(true);
            }
        }
        
    }, [isCloned])
    

    return (
        <main className="bg-white px-5 md:px-0">
        <CloneConfirmationModal postID={post.postID}/>
        <div className='mb-10'>
            <div className='min-h-screen py-5'>
                <div className='max-w-screen-xl items-center mx-auto'>
                    {
                        post.published ? (<div></div>) : (
                            <div className="px-4">
                                    <span className="font-light text-white text-xs bg-violet-800 rounded-full px-4 py-1">Preview Mode</span>
                            </div>
                        )
                    }
                    <div className='flex flex-col'>
                        <div className='flex gap-3 font-bold text-2xl md:text-4xl px-4 mt-4'>
                            {post?.title}
                            
                        </div>
                        <div>
                            <div className='text-sm text-gray-400 px-4 py-2 font-light'>
                                {moment(post?.createdAt).format('MMM DD, YYYY')}
                            </div>
                        </div>

                        <Link href={`/profile/${post?.authorId}`}>
                        <div 
                            className='flex p-4 items-center gap-4'
                        >
                            <div className=''>
                                {
                                    <HiOutlineUserCircle className='inline-block text-5xl text-gray-400'/>  
                                }
                                 
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-sm text-gray-400'>
                                    {post?.authorName}
                                </div>
                                {/* <div className='text-sm text-violet-400 hover:text-violet-800 hover:underline'>
                                    + Follow
                                </div> */}
                            </div> 
                        </div>
                        </Link>
                    </div>

                </div>


                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4'>
                    <div className='w-full flex justify-between items-center '>
                        
                            {
                                isCloned ? (
                                    post.authorId === currentUser?.id ? 
                                    (
                                        <span className="text-xs font-light px-4">Cloned from <Link href={`/view/${post.parentPostId}`}><span className="text-violet-800 hover:underline">{post.parentPostId}</span></Link></span>
                                    ): (<div></div>)
                                ) : (
                                    <div></div>
                                )
                            }
                            <div className='flex gap-7 items-center text-gray-700'>
                                
                                {
                                    post.authorId === currentUser?.id ? (
                                        isMobileView ? (<div className="flex gap-2 hover:text-violet-800" onClick={handleError}>
                                        <AiOutlineEdit className='inline-block text-2xl'/> 
                                        <span className='hidden md:block '>Edit</span>
                                         </div>):
                                        (<Link href={`/editor/${post.postID}`}>
                                            <div className="flex gap-2 hover:text-violet-800 ">
                                                <AiOutlineEdit className='inline-block text-2xl'/> 
                                                <span className='hidden md:block '>Edit</span>
                                            </div>
                                        </Link>)
                                    ) : null
                                }
                                
                                <div className="flex gap-2 hover:text-violet-800">
                                    <LikeButton postID={post.postID} currentUser={currentUser} /> 
                                    <span className='hidden md:block'>Like</span>
                                </div>
                                
                                <button onClick={copyLink}>
                                    <div className="flex gap-2 hover:text-violet-800">
                                        <AiOutlineShareAlt className='inline-block text-2xl'/> 
                                        <span className='hidden md:block '>Share</span>
                                    </div>
                                </button>
                                
                                {isCloned ? (
                                    <div className="flex gap-2 ">
                                        <button onClick={handleCloneAction}>
                                            <FaClone className='inline-block text-2xl text-violet-800'/>
                                        </button> 
                                        <span className='hidden md:block '>Cloned</span>
                                    </div>
                                ):
                                (
                                    <div className="flex gap-2 hover:text-violet-800">
                                        <button onClick={cloneConfirmationModal.onOpen}>
                                            <FaRegClone className='inline-block text-2xl'/>
                                        </button> 
                                        <span className='hidden md:block '>Clone</span>
                                    </div>
                                )
                                }
                            </div>
                        
                    </div>
                </div>

                {/* horizontal gray line */}
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2'>
                    <div className='w-full h-0.5 bg-gray-200'></div>
                </div>

                

                
                <div className='max-w-screen-xl items-center justify-between mx-auto py-5'>
                    { files.length === 0 ? null :
                    <span className="text-gray-400 text-xs md:text-md px-4">Files</span>
                    }   
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                        {
                            files.map((file, index) => (
                                <div key={file + index}>
                                    <a target="_blank" href={file} rel="noopener noreferrer">
                                        <div className='bg-white rounded-lg border-2 border-gray-400 p-2'>
                                            <div className="flex items-center py-1">
                                                    <VscFile className='text-lg text-gray-500' /> 
                                                    <div className='text-xs font-light ml-2 text-gray-500'>{file.split("/").at(-1)?.split(".", 2).at(-1)?.toUpperCase()}</div>
                                            </div>
                                            <div className='flex font-light text-black items-center'>
                                                <p className='text-sm truncate'>{file.split("/").at(-1)}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grasp-sun-editor">
                        <SunEditor
                            setContents={post.content ? post.content : ""}
                            hideToolbar={true}
                            disable={true}
                            readOnly={true}
                            height="auto"
                            setOptions={{
                                resizingBar: false, 
                                showPathLabel: false
                            }}   
                            setDefaultStyle="border: 0;"
                        />

                    </div>
                </div>


            </div>  
        </div>
        </main>
    );
}

export default PostClient;