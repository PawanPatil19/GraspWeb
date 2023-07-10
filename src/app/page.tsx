import { redirect, useRouter } from 'next/navigation';


import Image from 'next/image';
import React from 'react';
import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle, AiOutlineArrowRight } from 'react-icons/ai';
import Navbar from './components/NavBar/navbar';
import Link from 'next/link';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';
import getPosts from './actions/getPosts';
import Post from './components/Post';



export default async function Home() {
  const posts = await getPosts();
  const currentUser = await getCurrentUser();

    if(posts.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        )
    }


  return (
    <div className="bg-white px-5 md:px-0">
      <div className='flex flex-col h-full'>
        

        {/* Home page section before log in */}
        
        <div>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-10'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
              <div className='py-10 md:my-auto'>
                <span className='text-4xl md:text-6xl font-semibold'>
                  Lorem Ipsum
                </span>
                <div className='w-3/4'>
                  <p className='text-sm font-light text-gray-500 py-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <Link href='/upload'>
                  <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-light rounded-xl px-4 py-2 text-center'>
                    <span>
                      Start taking your notes&nbsp;
                      <AiOutlineArrowRight className='inline-block'/>
                    </span>
                  </button>
                </Link>
              </div>
              <div className='hidden md:block'>
                <Image
                  src="/images/home_page.svg"
                  alt="Home Page Image"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </div>
          </div>
        </div>


        {/* Search bar */}
        <div className='w-full mx-auto pt-10 pb-5'>
          <div className='w-full md:w-2/4 mx-auto rounded-lg shadow-lg px-5 md:px-10 py-5'>
            {/* search bar here */}
            <form>
              <div className="pb-5">  
                  <div className="flex w-full">
                      <input type="search" id="search-dropdown" className="p-2.5 w-full h-14 text-sm text-gray-400 bg-gray-100 rounded-lg  focus:outline focus:outline-violet-300" placeholder="Search Notes..." required />
                      <button type="submit" className="text-sm font-medium text-white bg-violet-800 rounded-r-lg border-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-800 px-5">
                          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          <span className="sr-only">Search</span>
                      </button>
                  </div>
              </div>
              <div className='flex mx-auto items-center text-sm justify-center overflow-x-auto py-2'>
                <div className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Computing
                </div>

                <div className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Business
                </div>

                <div className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Physics
                </div>

                <div className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  CS2030S
                </div>

                <div className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  CEG5104
                </div>

              </div>
          </form>
          </div>
        </div>



        {/* Notes section */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 md:p-4 mt-10'>
          {/* Card layout  */}
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {posts.map((post) => (
              <Post post={post} />
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}



