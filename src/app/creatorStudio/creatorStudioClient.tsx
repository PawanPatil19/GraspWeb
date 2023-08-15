"use client";

import { SafePost, SafeUser } from "@/app/types";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaUniversity } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import PostTable from "./postsTable";


interface CreatorStudioClientProps {
  posts: SafePost[];
  currentUser?: SafeUser | null;
  totalViews?: number;
  totalLikes?: number;
}

const CreatorStudioClient: React.FC<CreatorStudioClientProps> = ({ posts, currentUser, totalLikes, totalViews }) => {  
  
  const countUploadedPosts = posts.filter(post => post.published == true).length;

  return (
    <main className="bg-white px-5 md:px-0">
      <div className='mb-10'>
        <div className='h-full'>

            {/* Analytics cards */}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-10 rounded-2xl bg-white'>
                <span className='text-2xl md:text-3xl font-medium'>
                    Your Dashboard
                </span>
                <div className='w-full my-10'>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5'>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Posts</div>
                                <div className='text-5xl font-medium'>{countUploadedPosts}</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Views</div>
                                <div className='text-5xl font-medium'>{totalViews}</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Followers</div>
                                <div className='text-5xl font-medium'>0</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Likes</div>
                                <div className='text-5xl font-medium'>{totalLikes}</div>
                            </div>
                        </div>

                        <div className='bg-gray-100 h-96 rounded-2xl'>
                            <div className='text-sm font-medium p-5'>Your Profile</div>
                            <div className='flex flex-col p-5 items-center'>
                                <VscAccount className='text-9xl text-gray-400'/>
                                <div className='text-3xl font-medium'>{currentUser?.name}</div>
                            </div>

                            <div className="flex flex-col p-5 gap-3">
                                <div className="flex">
                                    <FaUniversity className="text-2xl" />
                                    <div className='ml-2 text-md font-medium'>Affliated University</div>
                                </div>
                                <div className="flex">
                                    <AiFillMail className='text-2xl'/>
                                    <div className='ml-2 text-md font-medium '>{currentUser?.email}</div>
                                </div>
                                
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>

             {/* Your notes section*/}
             <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                <div className='w-full'>
                    <div className=''>
                        <div className='text-3xl font-medium'>Your notes</div>
                    </div>

                    <PostTable posts={posts} />
                    
                </div>
            </div>

        </div>


      </div>
    </main>
  );
};

export default CreatorStudioClient;
