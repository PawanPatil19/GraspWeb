'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineLike, AiOutlineFileText, AiOutlineShareAlt, AiOutlineStar, AiFillStar, AiOutlineEdit } from 'react-icons/ai';
import {FaRegClone} from 'react-icons/fa';
import {HiOutlineUserCircle} from 'react-icons/hi';
import Avatar from '../../components/Avatar';
import { SafePost, SafeUser } from "@/app/types";
import moment from 'moment';
import Link from "next/link";




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
    

    return (
        <main className="bg-white px-5 md:px-0">
        <div className='mb-10'>
            <div className='min-h-screen'>

                {/*Search bar in right top corner*/}
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                    <div className='flex justify-end w-full pt-4'>
                        <div className='flex justify-end w-full md:w-1/3'>
                            <div className='flex justify-end w-full md:w-1/2'>
                                <input className='w-full border-b-2 px-4 py-2 text-center focus:outline-none focus-visible:' type="text" placeholder="Search"/>
                                <AiOutlineSearch className='my-auto mx-2 text-2xl text-violet-800'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-screen-xl flex flex-wrap items-center mx-auto'>
                    <div className='flex flex-col'>
                        <div className='flex gap-3 font-bold text-2xl md:text-4xl px-4 mt-10'>
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
                                <div className='text-sm text-violet-400 hover:text-violet-800 hover:underline'>
                                    + Follow
                                </div>
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
                                        <span className="flex gap-2">
                                            <AiOutlineEdit className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                            <span className='hidden md:block text-gray-400'>Edit</span>
                                        </span>
                                    ) : null
                                }
                                </Link>
                                <span className="flex gap-2">
                                    <AiOutlineLike className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                    <span className='hidden md:block text-gray-400'>Like</span>
                                </span>
                                <span className="flex gap-2">
                                    <AiOutlineShareAlt className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline '/> 
                                    <span className='hidden md:block text-gray-400'>Share</span>
                                </span>
                                <span className="flex gap-2">
                                    <FaRegClone className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                    <span className='hidden md:block text-gray-400'>Clone</span>
                                </span>
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
                                        <AiOutlineFileText className='inline-block text-2xl text-gray-400'/>
                                        <span>{file.split("/").at(-1)}</span>
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