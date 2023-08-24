"use client";

import {
  AiOutlineArrowRight,
} from "react-icons/ai";

import { SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import NotesCard from "../components/NotesCard";

import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { CoursePlan } from "@prisma/client";

interface UploadClientProps {
  posts: SafePostWithPlan[];
  currentUser?: SafeUser | null;
  coursePlans: CoursePlan[]
}

const UploadClient: React.FC<UploadClientProps> = ({ posts, currentUser, coursePlans }) => {
  const [showDrafts, setShowDrafts] = useState(true);
  const [showUploads, setShowUploads] = useState(false);
  

  const [ coursePlan, setCoursePlan ] = useState("");

  const drafts = coursePlan === "" ? posts.filter((post) => post.published === false) : posts.filter((post) => post.published === false && post.coursePlanId === coursePlan);
  const uploads = coursePlan === "" ? posts.filter((post) => post.published === true) : posts.filter((post) => post.published === true && post.coursePlanId === coursePlan);

  

  const options = [{ value: "all", label: "All" }]

  options.push(...coursePlans.map((coursePlan) => {
    return { value: coursePlan.id, label: coursePlan.title as string }
  }))

  



  return (
    <main className="bg-white">
      <div className="mb-10 px-5 md:p-4">
        <div className="h-screen">
          
          {/* Upload card*/}
          {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4 mt-10 rounded-2xl bg-white border-2 border-gray-300 hover:border-violet-800">
            <div className="w-full my-10">
              <div className="flex w-full justify-center">
                <div className="text-2xl md:text-3xl font-medium text-center">
                  Create your own notes
                </div>
              </div>
              <div className="flex w-full justify-center pt-2">
                <div className="text-xs md:text-lg font-light text-gray-400 text-center">
                  Upload your notes and share it with others
                </div>
              </div>
              <div className="flex w-full justify-center pt-5">
                <a href={`/editor/${uuidv4()}`}>
                  <button className="bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center">
                    Go to Editor{" "}
                    <AiOutlineArrowRight className="inline-block" />
                  </button>
                </a>
              </div>
            </div>
          </div> */}

          {/* Create button */}
          <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
            <div className="flex items-center gap-4">
              <div className="font-medium text-4xl">
                Your Notes
              </div>

              <div className="flex flex-col gap-8">
                <select 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-800 focus:border-violet-800 block w-full p-2 "
                  onChange={(e) => {
                    if(e.target.value === "null") {
                        setCoursePlan("");
                    } else {
                        setCoursePlan(e.target.value);
                    }
                }}
                
                >
                    <option value="null">All</option>
                    {
                      coursePlans.map((coursePlan, index) => {
                        return <option value={coursePlan.id} key={index}>{coursePlan.title}</option>
                      }
                      )
                    }
                </select>
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
                                  {drafts.length}
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
                                  {drafts.length}
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
                                  {uploads.length}
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
                                  {uploads.length}
                                </span>
                              </span>
                            </button>
                        )
                    }
                </li>
            </ul>

          {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  p-4">
            <div className="w-full">
              <div className="flex items-center">
                {showDrafts ? (
                  <div className="text-3xl font-medium">
                    <button
                      onClick={() => {
                        setShowDrafts(false);
                      }}
                    >
                      <span className="underline">Drafts</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-sm font-sm text-gray-400">
                    <button
                      onClick={() => {
                        setShowDrafts(true);
                        setShowUploads(false);
                      }}
                    >
                      Drafts
                    </button>
                  </div>
                )}

                {showUploads ? (
                  <div className="text-3xl font-medium ml-3">
                    <button
                      onClick={() => {
                        setShowUploads(false);
                      }}
                    >
                      <span className="underline">Uploads</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-sm font-sm ml-3 text-gray-400">
                    <button
                      onClick={() => {
                        setShowUploads(true);
                        setShowDrafts(false);
                      }}
                    >
                      Uploads
                    </button>
                  </div>
                )}
              </div> */}



              <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-12">
                {showDrafts
                  ? drafts.map((post) => (
                      <div key={post.postID}>
                        <NotesCard post={post} />
                      </div>
                    ))
                  : uploads.map((post) => (
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

export default UploadClient;
