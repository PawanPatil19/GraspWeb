'use client';

import { AiOutlineArrowRight, AiOutlineEye, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { SafePost, SafeUser } from "../types";
import Link from "next/link";
import React, { useState } from "react";

interface PostProps {
    post: SafePost & {
        user: SafeUser;
    };
}

const PostDisplay: React.FC<PostProps> = ({
    post
}) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className='py-2'>
            <div className='bg-white rounded-lg shadow-2xl h-52 w-full md:w-11/12 hover:outline hover:outline-violet-800'>
            <div className='grid grid-cols-2 w-full h-full'>
                <div className='flex flex-col bg-gradient-to-r from-violet-800 to-violet-500 p-5 text-white text-lg md:text-2xl font-semibold rounded-l-lg'>
                    {post.title}
                <div className='flex mt-auto w-2/4'>
                    <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                    Tag 1
                    </span>
                    <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                    Tag 2
                    </span>
                </div>
                
                </div>
                <div className='p-4 flex flex-col rounded-r-lg'>
                <p className='text-sm font-light text-gray-500 line-clamp-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                    <div className='flex mt-auto items-center'>
                        <AiOutlineEye className='text-2xl'/> <span className='px-2'>20</span>
                        {liked ? 
                            <AiFillLike className='text-2xl text-violet-800' onClick={() => setLiked(false)}/> 
                            : <AiOutlineLike className='text-2xl' onClick={() => setLiked(true)}/>
                        }
                        <span className='pl-2'>20</span>
                    
                        
                            <div className='w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800 hidden md:block'>
                            <Link href={`/view/${post.postID}`}>Read <AiOutlineArrowRight className='inline-block'/></Link>
                            </div>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default PostDisplay;