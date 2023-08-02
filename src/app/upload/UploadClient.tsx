'use client';

import { AiOutlineSearch, AiOutlineLike, AiOutlineDownload, AiOutlineHighlight, AiOutlineShareAlt, AiOutlineStar, AiFillStar, AiOutlineArrowRight } from 'react-icons/ai';

import { SafePost, SafeUser } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';
import NotesCard from "../components/NotesCard";
import React from 'react';




interface UploadClientProps {
    posts: SafePost[];
    currentUser?: SafeUser | null;
}


const UploadClient : React.FC<UploadClientProps> = ({
    posts,
    currentUser
}) => {

    const [showDrafts, setShowDrafts] = React.useState<boolean>(true);
    const [showUploads, setShowUploads] = React.useState<boolean>(false);

    const drafts = posts.filter((post) => post.published === false);
    const uploads = posts.filter((post) => post.published === true);

    return (
        <main className="bg-white">
      <div className='mb-10 px-5 md:px-0'>
        <div className='h-screen'>

            {/*Search bar in right top corner*/}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='flex justify-end w-full pt-4'>
                    <div className='flex justify-end w-full md:w-1/3'>
                        <div className='flex justify-end w-full md:w-1/2'>
                            <input className='w-full border-b-2 px-4 py-2 text-center focus:outline-none focus-visible:' type="text" placeholder="Search"/>
                            <AiOutlineSearch className='my-auto mx-2 text-2xl text-violet-800'/>
                        </div>
                    </div>
                </div>
            </div>


            {/* Upload card*/}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4 mt-10 rounded-2xl bg-white border-2 border-gray-300 hover:border-violet-800'>
                <div className='w-full my-10'>
                    <div className='flex w-full justify-center'>
                        <div className='text-2xl md:text-4xl font-medium text-center'>Create your own notes</div>
                    </div>
                    <div className='flex w-full justify-center pt-2'>
                        <div className='text-sm md:text-lg font-light text-gray-400 text-center'>Upload your notes and share it with others</div>
                    </div>
                    <div className='flex w-full justify-center pt-5'>
                        <a href={`/editor/${uuidv4()}`}><button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center'>
                            Go to Editor <AiOutlineArrowRight className='inline-block'/>
                        </button>
                        </a>
                    </div>
                </div>
            </div>

            
             {/* Your notes section*/}
            
             <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                <div className='w-full'>
                    <div className='flex items-center'>
                        {
                            showDrafts ? (
                                <div className='text-3xl font-medium '>
                                    <button onClick={() => {
                                        setShowDrafts(false);

                                    }}>
                                    Drafts
                                    </button>
                                </div>
                            ) : (
                                <div className='text-sm font-sm text-gray-400'>
                                    <button onClick={() => {
                                        setShowDrafts(true);
                                        setShowUploads(false);
                                    }}>
                                    Drafts
                                    </button>
                                </div>
                            )
                        }

                        {
                            showUploads ? (
                                <div className='text-3xl font-medium ml-3'>
                                    <button onClick={() => {
                                        setShowUploads(false);
                                    }}>
                                        Uploads
                                    </button>
                                </div>
                            ) : (
                                <div className='text-sm font-sm ml-3 text-gray-400'>
                                    <button onClick={() => {
                                        setShowUploads(true);
                                        setShowDrafts(false);
                                    }}>
                                    Uploads
                                    </button>
                                </div>
                            )
                        }

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-12'>
                        {
                            showDrafts ? (
                                drafts.map((post) => (
                                    <div key={post.postID}>
                                        <NotesCard post={post} />
                                    </div>
                                ))
                            ) : (
                                uploads.map((post) => (
                                    <div key={post.postID}>
                                        <NotesCard post={post} />
                                    </div>
                                ))
                            )
                            
                        }
                        {/* Create a notes card */}
                        {/* {
                            posts.map((post) => (
                                <div key={post.postID}>
                                    <NotesCard post={post} />
                                </div>
                            ))
                        } */}
                    </div>
                </div>
            </div>
        </div>

        
      </div>
    </main>
    );
}

export default UploadClient;