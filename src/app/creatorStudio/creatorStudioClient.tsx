"use client";

import { SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaUniversity } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import PostTable from "./postsTable";
import { CoursePlan } from "@prisma/client";
import moment from "moment";
import { redirect } from "next/navigation";
import Link from "next/link";


interface CreatorStudioClientProps {
  posts: SafePostWithPlan[];
  currentUser?: SafeUser | null;
  totalViews?: number;
  totalLikes?: number;
  coursePlans?: CoursePlan[];
}

const CreatorStudioClient: React.FC<CreatorStudioClientProps> = ({ posts, currentUser, totalLikes, totalViews, coursePlans }) => {  
  
  const countUploadedPosts = posts.filter(post => post.published == true).length;

  const [ viewAll, setViewAll ] = useState(false);
  


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
                            <div className='bg-gray-100 rounded-2xl p-5 shadow-lg'>
                                <div className='text-sm font-medium pb-5'>Posts</div>
                                <div className='text-5xl font-medium'>{countUploadedPosts}</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5 shadow-lg'>
                                <div className='text-sm font-medium pb-5'>Views</div>
                                <div className='text-5xl font-medium'>{totalViews}</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5 shadow-lg'>
                                <div className='text-sm font-medium pb-5'>Course Plans</div>
                                <div className='text-5xl font-medium'>{coursePlans?.length}</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5 shadow-lg'>
                                <div className='text-sm font-medium pb-5'>Likes</div>
                                <div className='text-5xl font-medium'>{totalLikes}</div>
                            </div>
                        </div>

                        <div className='bg-gray-100 h-96 rounded-2xl shadow-lg'>
                            <div className='text-sm font-medium p-5'>Your Profile</div>
                            <div className='flex flex-col p-5 items-center gap-5'>
                                <VscAccount className='text-9xl text-gray-400'/>
                                <div className='text-3xl font-medium'>{currentUser?.name}</div>
                                <div>
                                    <div className="flex text-gray-500">
                                        <FaUniversity className="text-2xl" />
                                        <div className='ml-2 text-md font-medium'>Affliated University</div>
                                    </div>
                                    <div className="flex text-gray-500 mt-2">
                                        <AiFillMail className='text-2xl'/>
                                        <div className='ml-2 text-md font-medium '>{currentUser?.email}</div>
                                    </div>
                                </div>
                                
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>

            {/* Your course plans section */}

            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='text-3xl font-medium'>Your course plans</div>
                        <div className='text-sm font-medium text-violet-800 hover:text-violet-500'>
                            {
                                viewAll ? (
                                    <button onClick={() => setViewAll(false)}>View less</button>
                                ) : (
                                    <button onClick={() => setViewAll(true)}>View all</button>
                                )
                            }
                        </div>
                    </div>
                   {/* make a collasible grid with 4 cards in each row with a view all button */}
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 mt-4'>
                        {coursePlans?.map((coursePlan, index) => (
                            index < 4 && !viewAll ? (
                                <Link href={`/coursePlanPage/${coursePlan.id}`}>
                                <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400'>
                                    <div className='p-4'>
                                        <div className='text-lg hover:text-violet-800'>{coursePlan.title}</div>
                                        <div className='text-sm text-gray-400'>{moment(coursePlan.createdAt).format('MMM DD, YYYY')}</div>
                                    </div>
                                </div>
                                </Link>
                            ) : (
                                <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400'>
                                    <div className='p-4'>
                                        <div className='text-lg hover:text-violet-800'>{coursePlan.title}</div>
                                        <div className='text-sm text-gray-400'>{moment(coursePlan.createdAt).format('MMM DD, YYYY')}</div>
                                    </div>
                                </div>
                            )
                        ))}
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
