'use client';

import { AiOutlineEye, AiOutlineLike, AiFillLike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { SafePost, SafeUser } from "../types";

import Link from "next/link";
import React, { useState } from "react";
import moment from 'moment';
import useConfirmationModal from "../hooks/useConfirmationModal";
import ConfirmationModal from "./modals/ConfirmationModal";

interface PostProps {
    post: SafePost;
}

const NotesCard: React.FC<PostProps> = ({
    post
}) => {
    const [liked, setLiked] = useState(false);
    const [isPublished, setPublished] = useState(post.published);

    const confirmationModal = useConfirmationModal();

    return (
        
        <div>
            <ConfirmationModal postID={post.postID} />
        {!isPublished ? (
        <div className='flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400'>
            <div className='p-4'>
                <div className='text-lg hover:text-violet-800'>{post.title}</div>
            </div>
            <div className='flex mt-auto p-4'>
                <span className='text-sm text-gray-400'>Last updated on: {moment(post?.updatedAt).format('MMM DD, YYYY')}</span>
                <div className="flex ml-auto gap-2">
                    
                    <button onClick={confirmationModal.onOpen}>
                        <AiOutlineDelete className='text-2xl hover:text-red-500'/>
                    </button>
                    <Link href={`/editor/${post.postID}`} className=''>
                        <AiOutlineEdit className='text-2xl hover:text-violet-800' />
                    </Link>
                </div>
            </div>
        </div>
        ) : (
            <div className='flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl  border-2 border-gray-400'>
                <div className='p-4'>
                    <Link href={`/view/${post.postID}`} className='ml-auto'>
                        <div className='text-lg hover:text-violet-800 hover:underline'>{post.title}</div>
                    </Link>
                </div>
                <div className='flex mt-auto p-4'>
                    <AiOutlineEye className='text-2xl'/> <span className='pr-4'>{post.views}</span>
                    <AiOutlineLike className='text-2xl'/> <span>{post.likes}</span>
                    <div className="flex ml-auto gap-2">
                        <button onClick={confirmationModal.onOpen}>
                            <AiOutlineDelete className='text-2xl hover:text-red-500'/>
                        </button>
                        <Link href={`/editor/${post.postID}`} className=''>
                            <AiOutlineEdit className='text-2xl hover:text-violet-800' />
                        </Link>
                    </div>
                </div>
            </div>
        )
        }
        </div>
    );
}

export default NotesCard;