"use client";

import {
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineLike,
} from "react-icons/ai";
import { SafePost, SafePostWithPlan, SafeUser } from "../types";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import { Badge } from "@tremor/react";
import useLoginModal from "../hooks/useLoginModal";


interface PostDisplayProps {
  post: SafePostWithPlan;
  currentUser?: SafeUser | null;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const loginModal = useLoginModal();
  // console.log(post);

  return (
    <div className="py-2 ">
      <div className="bg-white rounded-lg shadow-2xl h-52 w-full hover:outline hover:outline-violet-800">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="flex flex-col bg-gradient-to-r from-violet-800 to-violet-500 p-5 text-white rounded-l-lg">
            {
              post.title ? post.title.length > 20 ? (
                <p className="text-lg font-medium">{post.title}</p>
              ) : (
                <p className="text-2xl font-medium">{post.title}</p>
              ) : (<div></div>)
            }
            {/* {post.title} */}
            <div className="flex mt-auto ml-auto">
              <Badge color="gray" size="xs">
                  {post.coursePlan.title}
              </Badge>
            </div>
          </div>
          <div className="p-4 flex flex-col rounded-r-lg">
            <p className="text-sm font-light text-gray-500 line-clamp-4">
              {post.description}
            </p>
            <div className="flex mt-auto items-center">
              <AiOutlineEye className="text-2xl" />{" "}
              <span className="px-2">{post.views}</span>
              {
                currentUser ? (
                  <LikeButton postID={post.postID} postTitle={post.title} postCreator={post.authorId} currentUser={currentUser} />
                ) : (
                  <button onClick={loginModal.onOpen}>
                    <button><AiOutlineLike className="text-2xl" /></button>
                  </button>
                )
              }
              
              {/* <span className="pl-2">{post.likes}</span> */}
              <div className="w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800 hidden md:block">
                {
                  currentUser ? (
                    <Link href={`/view/${post.postID}`}>
                      Read <AiOutlineArrowRight className="inline-block" />
                    </Link>
                  ) : (
                    <button onClick={loginModal.onOpen}>
                      Read <AiOutlineArrowRight className="inline-block" />
                    </button>
                  )
                }

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
