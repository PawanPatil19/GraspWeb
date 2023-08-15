'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { AiOutlineSearch, AiOutlineFileText, AiOutlineShareAlt, AiOutlineStar, AiFillStar, AiOutlineEdit } from 'react-icons/ai';
import {FaRegClone} from 'react-icons/fa';
import {HiOutlineUserCircle} from 'react-icons/hi';
import { SafePost, SafeUser } from "@/app/types";
import moment from 'moment';
import Link from "next/link";
import LikeButton from "@/app/components/LikeButton";
import useConfirmationModal from "@/app/hooks/useConfirmationModal";
import CloneConfirmationModal from "@/app/components/modals/CloneConfirmationModal";




interface PostClientProps {
    post: SafePost;
    currentUser?: SafeUser | null;
}


const PostClient : React.FC<PostClientProps> = ({
    post,
    currentUser
}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const files = post.uploadFiles;

    const cloneConfirmationModal = useConfirmationModal();


    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
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
    

    return (
        <main className="bg-white px-5 md:px-0">
        <CloneConfirmationModal postID={post.postID}/>
        <div className='mb-10'>
            <div className='min-h-screen py-5'>

                {/*Search bar in right top corner*/}
                {/* <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                    <div className='flex justify-end w-full pt-4'>
                        <div className='flex justify-end w-full md:w-1/3'>
                            <div className='flex justify-end w-full md:w-1/2'>
                                <input className='w-full border-b-2 px-4 py-2 text-center focus:outline-none focus-visible:' type="text" placeholder="Search"/>
                                <AiOutlineSearch className='my-auto mx-2 text-2xl text-violet-800'/>
                            </div>
                        </div>
                    </div>
                </div> */}

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
                            {isFavourite ? (
                                <button onClick={() => setIsFavourite(false)}>
                                    <AiFillStar className='inline-block text-yellow-400 text-2xl'/>
                                </button>
                            ) : (
                                <button onClick={() => setIsFavourite(true)}>
                                    <AiOutlineStar className='inline-block text-grey-400 text-2xl'/>
                                </button>
                            )}
                        </div>
                        <div>
                            <div className='text-sm text-gray-400 px-4 py-2 font-light'>
                                {moment(post?.createdAt).format('MMM DD, YYYY')}
                            </div>
                        </div>

                        <div className='flex p-4 items-center gap-4'>
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
                    </div>

                </div>


                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4'>
                    <div className='flex justify-end w-full'>
                        <div className='flex justify-end'>
                            <div className='flex justify-end gap-7 items-center text-gray-700'>
                                <Link href={`/editor/${post.postID}`}>
                                {
                                    post.authorId === currentUser?.id ? (
                                        <div className="flex gap-2 hover:text-violet-800 ">
                                            <AiOutlineEdit className='inline-block text-2xl'/> 
                                            <span className='hidden md:block '>Edit</span>
                                        </div>
                                    ) : null
                                }
                                </Link>
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
                                
                                <div className="flex gap-2 hover:text-violet-800">
                                    <button onClick={cloneConfirmationModal.onOpen}>
                                        <FaRegClone className='inline-block text-2xl'/>
                                    </button> 
                                    <span className='hidden md:block '>Clone</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* horizontal gray line */}
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2'>
                    <div className='w-full h-0.5 bg-gray-200'></div>
                </div>

                

                
                <div className='max-w-screen-xl items-center justify-between mx-auto py-5'>
                    { files.length === 0 ? null :
                    <span className="text-gray-400">Files</span>
                    }   
                    <div className="grid grid-cols-4 gap-4">
                        {
                            files.map((file, index) => (
                                <div key={file + index}>
                                    <a target="_blank" href={file} rel="noopener noreferrer">
                                        <div className='flex gap-2 border-2 px-2 py-4 rounded-lg hover:border-violet-800'>
                                            <AiOutlineFileText className='text-2xl text-gray-400'/>
                                            <span className="truncate">{file.split("/").at(-1)}</span>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                    <div className="ql-editor">
                        <div dangerouslySetInnerHTML={{__html: post.displayContent}} className="py-5"/>
                    </div>
                </div>


            </div>  
        </div>
        </main>
    );
}

export default PostClient;