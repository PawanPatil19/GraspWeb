'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Login from './components/Login/Login';
import RegisterPart1 from './components/Register/RegisterPart1';
import Register from './components/Register/RegisterPart1';
import RegisterPart2 from './components/Register/RegisterPart2';
import RegisterPart3 from './components/Register/RegisterPart3';
import Navbar from './components/Navigation Bar/navbar';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showRegisterPart2Modal, setShowRegisterPart2Modal] = React.useState(false);
  const [showRegisterPart3Modal, setShowRegisterPart3Modal] = React.useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  

  const handleClick = () => {
    redirect('/upload');
  };

  return (
    <main className="bg-white">
      <div className='flex flex-col h-full'>
        <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} isUserLoggedIn={isUserLoggedIn}/>

        {/* Home page section before log in */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-10'>
          <div className='grid grid-cols-1 w-full md:grid-cols-2'>
            <div className='my-auto'>
              <span className='text-6xl font-semibold'>
                Lorem Ipsum
              </span>
              <span>
                <p className='text-sm font-light text-gray-500 py-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit, sed do eiusmod tempor incididunt<br/> ut labore et dolore magna aliqua.
                </p>
              </span>
              <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-semibold rounded-xl px-4 py-2 text-center' 
                onClick={handleClick}>
                <span>
                  Start taking your notes&nbsp;
                  <AiOutlineArrowRight className='inline-block'/>
                </span>
              </button>
            </div>
            <div>
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


        {/* Search bar */}
        <div className='w-full mx-auto py-10'>
          <div className='w-2/4 mx-auto rounded-lg shadow-lg px-10 py-5'>
            {/* search bar here */}
            <form>
              <div className="pb-5">  
                  <div className="relative w-full">
                      <input type="search" id="search-dropdown" className="block p-2.5 w-full h-14 z-20 text-sm text-gray-400 bg-gray-100 rounded-lg  focus:outline focus:outline-violet-300" placeholder="Search Notes..." required />
                      <button type="submit" className="absolute top-0 right-0 p-2.5 h-14 w-29 text-sm font-medium text-white bg-violet-800 rounded-r-lg border-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-800 ">
                          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          <span className="sr-only">Search</span>
                      </button>
                  </div>
              </div>
              <div className='flex mx-auto items-center text-sm justify-center'>
                <span className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Computing
                </span>

                <span className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Business
                </span>

                <span className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  Physics
                </span>

                <span className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  CS2030S
                </span>

                <span className='text-violet-800 rounded-full bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white py-1 px-3 mx-2'>
                  CEG5104
                </span>

              </div>
          </form>
          </div>
        </div>



        {/* Notes section */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-10'>
          {/* Card layout  */}
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* Card 1 */}
            <div className=''>
              <div className='bg-white rounded-lg shadow-2xl h-52 w-11/12 hover:outline hover:outline-violet-800'>
                <div className='grid grid-cols-2 w-full h-full'>
                  <div className='flex flex-col bg-gradient-to-r from-violet-800 to-violet-500 p-5 text-white text-2xl font-semibold rounded-l-lg'>
                    Notes Topic
                    <div className='flex mt-auto w-2/4'>
                      <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                        CS2030S
                      </span>
                      <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                        CS2030S
                      </span>
                    </div>
                    
                  </div>
                  <div className='p-4 flex flex-col rounded-r-lg'>
                    <p className='text-sm font-light text-gray-500'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                      <div className='flex mt-auto'>
                        <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                        <AiOutlineLike className='text-2xl'/> <span>32</span>
                        <button className='w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800'>Read <AiOutlineArrowRight className='inline-block'/></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className=''>
              <div className='bg-white rounded-lg shadow-2xl h-52 w-11/12 hover:outline hover:outline-violet-800'>
                <div className='grid grid-cols-2 w-full h-full'>
                  <div className='flex flex-col bg-gradient-to-r from-violet-800 to-violet-500 p-5 text-white text-2xl font-semibold rounded-l-lg'>
                    Notes Topic
                    <div className='flex mt-auto w-2/4'>
                      <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                        CS2030S
                      </span>
                      <span className='ml-auto text-xs text-light text-violet-800 rounded-full bg-white border-2 border-violet-800 py-1 px-1'>
                        CS2030S
                      </span>
                    </div>
                    
                  </div>
                  <div className='p-4 flex flex-col rounded-r-lg'>
                    <p className='text-sm font-light text-gray-500'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.mad
                    </p>
                      <div className='flex mt-auto'>
                        <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                        <AiOutlineLike className='text-2xl'/> <span>32</span>
                        <button className='w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800'>Read  <AiOutlineArrowRight className='inline-block'/></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Login popup modal */}
        {showLoginModal ? (
          <Login setShowLoginModal={setShowLoginModal}/>
          ) : null }
        
        {/* Register popup modal */}
        {showRegisterModal ? (
          // pass multiple state to Register
          <RegisterPart1 setShowRegisterModal={setShowRegisterModal} setShowRegisterPart2Modal={setShowRegisterPart2Modal}/>
          ) : null }

        {/* Register part 2 popup modal */}
        {showRegisterPart2Modal ? (
          <RegisterPart2 setShowRegisterModal={setShowRegisterModal} setShowRegisterPart2Modal={setShowRegisterPart2Modal} setShowRegisterPart3Modal={setShowRegisterPart3Modal}/>
          ) : null }

        {/* Register part 3 popup modal */}
        {showRegisterPart3Modal ? (
          <RegisterPart3 setShowRegisterPart2Modal={setShowRegisterPart2Modal} setShowRegisterPart3Modal={setShowRegisterPart3Modal}/>
          ) : null }

        
      </div>
    </main>
  )
}



