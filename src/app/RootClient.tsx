"use client";
import Image from "next/image";
import React, { useState } from "react";


import { SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Search from "./components/Search/search";
import useLoginModal from "./hooks/useLoginModal";


interface RootClientProps {
    posts: SafePostWithPlan[];
    currentUser?: SafeUser | null;
}

const RootClient: React.FC<RootClientProps> = ({ posts, currentUser }) => {

  const loginModal = useLoginModal();

  return (
    <div className="bg-white px-5 md:p-4">
      <div className="flex flex-col h-full min-h-screen">
        {/* Home page section before log in */}
        <div>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-5">
              <div className="py-10 md:my-auto col-span-3">
                <p className="text-4xl md:text-6xl font-semibold text-black">
                  Bridging <span className="text-violet-800">Educators</span>
                </p>
                <p className="text-4xl md:text-6xl font-semibold text-black mt-4">
                  In The Virtual World
                </p>

                <div className="w-2/4">
                  <p className="text-sm font-light text-gray-500 py-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="mt-4">
                {
                  currentUser == null ? (
                    <button 
                        onClick={loginModal.onOpen}
                        className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-light rounded-xl px-4 py-2 text-center">
                        <span>
                            Start taking your notes&nbsp;
                            <AiOutlineArrowRight className="inline-block" />
                        </span>
                    </button>
                  ) : (
                    <Link href="/upload">
                      <button className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-light rounded-xl px-4 py-2 text-center">
                        <span>
                          Start taking your notes&nbsp;
                          <AiOutlineArrowRight className="inline-block" />
                        </span>
                      </button>
                    </Link>
                  )
                }
                </div>
              </div>
              <div className="hidden md:block col-span-2">
                <Image
                  src="/images/home_page1.svg"
                  alt="Home Page Image"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <Search posts={posts} currentUser={currentUser}/>
      </div>
    </div>

  );
};

export default RootClient;
