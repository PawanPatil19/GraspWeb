'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineLike, AiOutlineDownload, AiOutlineHighlight, AiOutlineShareAlt, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi';
import Avatar from '../../components/Avatar';
import { SafePost, SafeUser } from "@/app/types";
import moment from 'moment';




interface PostClientProps {
    post: SafePost & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}


const PostClient : React.FC<PostClientProps> = ({
    post,
    currentUser
}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    

    return (
        <main className="bg-white px-5 md:px-0">
        <div className='mb-10'>
            <div className='h-full'>

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
                                    post?.user.image === null ? (
                                        <HiOutlineUserCircle className='inline-block text-5xl text-gray-400'/>
                                    ) : (
                                        <Avatar src={post?.user.image} />
                                    )
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
                        <div className='flex justify-end w-1/3'>
                            <div className='flex justify-end gap-4 items-center text-gray-700'>
                                <span>
                                    <AiOutlineLike className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                    {/* <span className='hidden md:block'>Like</span> */}
                                </span>
                                <span>
                                    <AiOutlineShareAlt className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline '/> 
                                    {/* <span className='hidden md:block'>Share</span> */}
                                </span>
                                <span>
                                    <AiOutlineDownload className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                    {/* <span className='hidden md:block'>Download</span> */}
                                </span>
                                <span>
                                    <AiOutlineHighlight className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> 
                                    {/* <span className='hidden md:block'>Highlight</span> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4'>
                    <div dangerouslySetInnerHTML={{__html: post.displayContent}}/>
                </div>

                
                

                            


            </div>  
        </div>
        </main>
    );
}

export default PostClient;