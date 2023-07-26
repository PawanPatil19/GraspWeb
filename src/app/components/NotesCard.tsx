'use client';

import { AiOutlineEye, AiOutlineLike, AiFillLike, AiOutlineEdit } from "react-icons/ai";
import { SafePost, SafeUser } from "../types";

import Link from "next/link";
import React, { useState } from "react";
import moment from 'moment';

interface PostProps {
    post: SafePost & {
        user: SafeUser;
    };
}

const NotesCard: React.FC<PostProps> = ({
    post
}) => {
    const [liked, setLiked] = useState(false);
    const [isPublished, setPublished] = useState(post.published);

    return (
        <div>
        {!isPublished ? (
        <div className='flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-violet-300 border-2 border-gray-400'>
            <div className='p-4'>
                <div className='text-lg hover:text-violet-800 hover:underline'>{post.title}</div>
            </div>
            <div className='flex mt-auto p-4'>
                <span className='text-sm text-gray-400'>Last updated on: {moment(post?.updatedAt).format('MMM DD, YYYY')}</span>
                <Link href={`/editor/${post.postID}`} className='ml-auto'>
                    <AiOutlineEdit className='text-2xl' />
                </Link>
            </div>
        </div>
        ) : (
            <div className='flex flex-col bg-white rounded-2xl shadow-lg'>
                <div className='p-4'>
                    <div className='text-lg hover:text-violet-800 hover:underline'>{post.title}</div>
                </div>
                <div className='flex mt-auto p-4'>
                    <AiOutlineEye className='text-2xl'/> <span className='pr-4'>0</span>
                    <AiOutlineLike className='text-2xl'/> <span>0</span>
                    <AiOutlineEdit className='text-2xl ml-auto'/>
                </div>
            </div>
        )
        }
        </div>
    );
}

export default NotesCard;