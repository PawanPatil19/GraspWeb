"use client";

import { SafeCoursePlan, SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import React, { useState } from "react";
import { CoursePlan } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import NotesCard from "@/app/components/NotesCard";

interface CoursePlanPageClientProps {
  posts: SafePostWithPlan[] | null;
  currentUser?: SafeUser | null;
  coursePlan?: SafeCoursePlan | null;
}

const CoursePlanPageClient : React.FC<CoursePlanPageClientProps> = ({ posts, currentUser, coursePlan }) => {  

    const [showDrafts, setShowDrafts] = useState(true);
    const [showUploads, setShowUploads] = useState(false);


    const drafts = posts?.filter((post) => post.published === false);
    const uploads = posts?.filter((post) => post.published === true);


  return (
    <main className="bg-white">
      <div className="mb-10 px-5 md:p-4">
        <div className="h-screen">
         
          {/* Create button */}
          <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
            <div className="flex items-center gap-4">
              <div className="font-medium text-4xl">
                {coursePlan?.title}
              </div>
            </div>


            <div className="">
              <a href={`/editor/${uuidv4()}`}>
                <button className="bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center">
                  Create +
                </button>
              </a>
            </div>
          </div>

          {/* Your notes section*/}

          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4">
          <div className="w-full">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                    {
                        showDrafts ? (
                          <button 
                            className="inline-block p-4 text-violet-800 border-b-2 border-violet-800 rounded-t-lg active dark:text-violet-800 dark:border-violet-800">
                              <span className="flex items-center">
                                Drafts
                                <span className="ml-2 text-xs font-light text-gray-400">
                                  {drafts?.length}
                                </span>
                              </span>
                          </button>
                        ) :
                        (
                          <button 
                            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300" 
                            onClick={() => {setShowDrafts(true); setShowUploads(false)}}>
                              <span className="flex items-center">
                                Drafts
                                <span className="ml-2 text-xs font-light text-gray-400">
                                  {drafts?.length}
                                </span>
                              </span>
                            </button>
                        )
                    }
                </li>
                <li className="mr-2">
                {
                        showUploads ? (
                          <button 
                            className="inline-block p-4 text-violet-800 border-b-2 border-violet-800 rounded-t-lg active dark:text-violet-800 dark:border-violet-800">
                              <span className="flex items-center">
                                Uploads
                                <span className="ml-2 text-xs font-light text-gray-400">
                                  {uploads?.length}
                                </span>
                              </span>
                          </button>
                        ) :
                        (
                          <button 
                            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300" 
                            onClick={() => {setShowDrafts(false); setShowUploads(true)}}>
                              <span className="flex items-center">
                                Uploads
                                <span className="ml-2 text-xs font-light text-gray-400">
                                  {uploads?.length}
                                </span>
                              </span>
                            </button>
                        )
                    }
                </li>
            </ul>

          



              <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-12">
                {showDrafts
                  ? drafts?.map((post) => (
                      <div key={post.postID}>
                        <NotesCard post={post} />
                      </div>
                    ))
                  : uploads?.map((post) => (
                      <div key={post.postID}>
                        <NotesCard post={post} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default CoursePlanPageClient;
