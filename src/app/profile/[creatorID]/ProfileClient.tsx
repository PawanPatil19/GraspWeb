"use client";

import { SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaUniversity, FaUserCircle } from "react-icons/fa";
import { AiFillMail,AiOutlineShareAlt } from "react-icons/ai";
import { CoursePlan } from "@prisma/client";
import moment from "moment";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import PostsGrid from "@/app/components/PostsGrid";



interface ProfileClientProps {
  posts: SafePostWithPlan[];
  currentUser?: SafeUser | null;
  coursePlans?: CoursePlan[];
  isMobileView?: RegExpMatchArray;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ posts, currentUser, coursePlans, isMobileView }) => {  
    
        
    const countUploadedPosts = posts.filter(post => post.published == true).length;

    const [ viewAll, setViewAll ] = useState(false);

    return (
        <main className="bg-white px-5 md:px-0">
            <div className='mb-10'>
                <div className='h-full'>
                    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-10 mb-5 rounded-2xl bg-white'>
                        {/* Creaotr profile details section */}
                        <div className="w-full flex justify-between">
                            <div className="flex items-center">
                                <FaUserCircle size={150} className="text-gray-300 text-3xl" />
                                <div className="ml-5">
                                    <div className="flex flex-col">
                                        <div className="text-lg md:text-3xl font-bold">
                                            {currentUser?.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            University
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <AiOutlineShareAlt size={30} className="text-gray-400" />
                            </div>
                        </div>

                    </div>

                    {/* horizontal gray line */}
                    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2'>
                            <div className='w-full h-0.5 bg-gray-200'></div>
                    </div>

                    {/* Course plans section */}

                    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='text-lg md:text-2xl font-medium'>Course plans</div>
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
                                    viewAll ? (
                                        <Link href={`/coursePlanPage/${coursePlan.id}`} key={index}>
                                            <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400' >
                                                <div className='p-4'>
                                                    <div className='text-lg hover:text-violet-800'>{coursePlan.title}</div>
                                                    <div className='text-sm text-gray-400'>{moment(coursePlan.createdAt).format('MMM DD, YYYY')}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        isMobileView ? (
                                            index < 1 ? (
                                                <Link href={`/coursePlanPage/${coursePlan.id}`} key={index}>
                                                    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400' >
                                                        <div className='p-4'>
                                                            <div className='text-lg hover:text-violet-800'>{coursePlan.title}</div>
                                                            <div className='text-sm text-gray-400'>{moment(coursePlan.createdAt).format('MMM DD, YYYY')}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div></div>
                                            )
                                    ) : (
                                        index < 4 ? (
                                            <Link href={`/coursePlanPage/${coursePlan.id}`} key={index}>
                                                <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-400' >
                                                    <div className='p-4'>
                                                        <div className='text-lg hover:text-violet-800'>{coursePlan.title}</div>
                                                        <div className='text-sm text-gray-400'>{moment(coursePlan.createdAt).format('MMM DD, YYYY')}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div></div>
                                        )
                                    )
                                )
                                ))
                            }
                            </div>
                        </div>
                    </div>

                    
                    {/* Notes section */}

                    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                        <div className='w-full'>
                            <div className=''>
                                <div className='text-lg md:text-2xl font-medium'>Notes</div>
                            </div>
                            <PostsGrid posts={posts} currentUser={currentUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  );
};

export default ProfileClient;
