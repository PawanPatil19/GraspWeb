'use client';

import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineLike, AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';


export default function Home() {

  return (
    <main className="bg-white px-5 md:px-0">
      <div className='mb-10'>
        <div className='h-full'>

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

            {/* Analytics cards */}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-10 rounded-2xl bg-white'>
                <span className='text-2xl md:text-3xl font-medium'>
                    Your Dashboard
                </span>
                <div className='w-full my-10'>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5'>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Views</div>
                                <div className='text-5xl font-medium'>00</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Likes</div>
                                <div className='text-5xl font-medium'>00</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Followers</div>
                                <div className='text-5xl font-medium'>00</div>
                            </div>
                            <div className='bg-gray-100 rounded-2xl p-5'>
                                <div className='text-sm font-medium pb-5'>Posts</div>
                                <div className='text-5xl font-medium'>00</div>
                            </div>
                        </div>

                        <div className='bg-gray-100 h-96 rounded-2xl'>
                            <div className='text-sm font-medium p-5'>Revenue</div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Account Registered */}
            {/* <div className='w-full md:w-2/4 flex flex-wrap items-center justify-between mx-auto my-auto mt-10 rounded-2xl bg-gray-100'>
                <div className='w-full my-10'>
                    <div className='flex justify-center text-sm font-light mb-2 px-2 text-center'>
                        You have no bank account registered with your creator account
                    </div>
                    <div className='flex justify-center text-sm font-light mt-5'>
                        <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center'>
                            Add your account details <AiOutlineArrowRight className='inline-block'/>
                        </button>
                    </div>
                </div>

            </div> */}


            
             {/* Your notes section*/}
            
             <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-12'>
                <div className='w-full'>
                    <div className=''>
                        <div className='text-3xl font-medium'>Your notes</div>
                    </div>
                    
                </div>
            </div>

        </div>


      </div>
    </main>
  )
}



