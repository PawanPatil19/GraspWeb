import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";

import Link from "next/link";
import getPosts from "./actions/getPosts";
import PostsGrid from "./components/PostsGrid";
import Search from "./components/Search/search";
import Hydrate from "./components/hydrate-client";
import getQueryClient from "./libs/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const posts = await getPosts();
  
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="bg-white px-5 md:p-4">
      <div className="flex flex-col h-full min-h-screen">
        {/* Home page section before log in */}
        <div>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-5">
              <div className="py-10 md:my-auto col-span-3">
                <span className="text-4xl md:text-6xl font-semibold text-black">
                  Lorem Ipsum
                </span>
                <div className="w-2/4">
                  <p className="text-sm font-light text-gray-500 py-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <Link href="/upload">
                  <button className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-light rounded-xl px-4 py-2 text-center">
                    <span>
                      Start taking your notes&nbsp;
                      <AiOutlineArrowRight className="inline-block" />
                    </span>
                  </button>
                </Link>
              </div>
              <div className="hidden md:block col-span-2">
                <Image
                  src="/images/home_page.svg"
                  alt="Home Page Image"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {/* <div className="w-full mx-auto pt-10 pb-5">
          <div className="w-full md:w-2/4 mx-auto rounded-lg shadow-lg px-5 md:px-10 py-5"> */}
            {/* search bar here */}
            
              <Search posts={posts}/>
          {/* </div>
        </div> */}

        {/* <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 md:p-4 mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {posts.map((post) => (
              <PostDisplay post={post} />
            ))}

          </div>
        </div> */}

        {/* <div>
          <PostsGrid posts={posts} />
        </div> */}
      </div>
    </div>
  );
}
