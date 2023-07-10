'use client';

import { AiOutlineSearch, AiOutlineLike, AiOutlineDownload, AiOutlineHighlight, AiOutlineShareAlt, AiOutlineStar, AiFillStar, AiOutlineArrowRight } from 'react-icons/ai';

import { SafePost, SafeUser } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';
import NotesCard from "../components/NotesCard";




interface UploadClientProps {
    posts: SafePost[];
    currentUser?: SafeUser | null;
}


const UploadClient : React.FC<UploadClientProps> = ({
    posts,
    currentUser
}) => {

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
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4 mt-10 rounded-2xl bg-white border-2 border-violet-800'>
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
                    <div className=''>
                        <div className='text-3xl font-medium'>Your drafts</div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-12'>
                        {/* Create a notes card */}
                        {
                            posts.map((post) => (
                                <NotesCard post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

        
      </div>
    </main>
    );
}

export default UploadClient;