'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineLike, AiOutlineDownload, AiOutlineHighlight, AiOutlineShareAlt, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi';
import Navbar from '../components/Navigation Bar/navbar';
import RegisterPart1 from '../components/Register/RegisterPart1';
import RegisterPart2 from '../components/Register/RegisterPart2';
import RegisterPart3 from '../components/Register/RegisterPart3';
import Login from '../components/Login/Login';


export default function Home() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showRegisterPart2Modal, setShowRegisterPart2Modal] = React.useState(false);
  const [showRegisterPart3Modal, setShowRegisterPart3Modal] = React.useState(false);
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  

  const handleClick = () => {
    console.log("Pressed")
    redirect('/upload');
  };

  return (
    <main className="bg-white">
      <div className='mb-10'>
        <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} isUserLoggedIn={isUserLoggedIn}/>

        <div className='h-full'>

            {/*Search bar in right top corner*/}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='flex justify-end w-full'>
                    <div className='flex justify-end w-1/3'>
                        <div className='flex justify-end w-1/2'>
                            <input className='w-full border-b-2 px-4 py-2 text-center focus:outline-none focus-visible:' type="text" placeholder="Search"/>
                            <AiOutlineSearch className='my-auto mx-2 text-2xl text-violet-800'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-screen-xl flex flex-wrap items-center mx-auto'>
                <div className='flex flex-col'>
                    <div className='font-bold text-4xl px-4 mt-10'>
                        Lorem ipsum dolor sit amet &nbsp;
                        {isFavourite ? (
                            <button onClick={() => setIsFavourite(false)}>
                                <AiFillStar className='inline-block text-yellow-400 text-2xl'/>
                            </button>
                        ) : (
                            <button onClick={() => setIsFavourite(true)}>
                                <AiOutlineStar className='inline-block text-grey-400 text-2xl'/>
                            </button>
                        )}
                    </div>
                    <div>
                        <div className='text-sm text-gray-400 px-4 py-2 font-light'>
                            Dec 10, 2023
                        </div>
                    </div>

                    <div className='flex w-1/3 p-4 items-center'>
                        <div className='w-1/3'>
                            <HiOutlineUserCircle className='inline-block text-5xl text-gray-400'/>
                        </div>
                        <div className='w-2/3 flex flex-col'>
                            <div className='text-sm text-gray-400'>
                                Author Name
                            </div>
                            <div className='text-sm text-violet-400 hover:text-violet-800 hover:underline'>
                                + Follow
                            </div>
                        </div> 
                    </div>
                </div>

            </div>


            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='flex justify-end w-full'>
                    <div className='flex justify-end w-1/3'>
                        <div className='flex justify-end gap-3 items-center text-gray-700'>
                            <span><AiOutlineLike className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> Like</span>
                            <span><AiOutlineShareAlt className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> Share</span>
                            <span><AiOutlineDownload className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> Download</span>
                            <span><AiOutlineHighlight className='inline-block text-2xl text-gray-400 hover:text-violet-800 hover:underline'/> Highlight</span>
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



