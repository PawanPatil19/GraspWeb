'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineLike, AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
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
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  


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


            {/* Upload card*/}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4 mt-10 rounded-2xl bg-white border-2 border-violet-800'>
                <div className='w-full my-10'>
                    <div className='flex w-full justify-center'>
                        <div className='text-4xl font-medium'>Create your own notes</div>
                    </div>
                    <div className='flex w-full justify-center pt-1'>
                        <div className='text-lg font-light text-gray-400'>Upload your notes and share it with others</div>
                    </div>
                    <div className='flex w-full justify-center pt-5'>
                        <a href="/editor"><button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center'>
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
                        <div className='text-3xl font-medium'>Your notes</div>
                    </div>
                    <div className='grid grid-cols-3 mt-5 gap-12'>
                        {/* Create a notes card */}
                        <div className='flex flex-col bg-white rounded-2xl shadow-lg'>
                            <div className='p-4'>
                                <Image src='/images/grasp_logo1.jpg' alt='Notes card' width={500} height={500} className='border-2 border-gray-100 rounded-lg' priority/>
                            </div>
                            <div className='p-4'>
                                <div className='text-lg hover:text-violet-800 hover:underline'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                            </div>
                            <div className='flex mt-auto p-4'>
                                <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                                <AiOutlineLike className='text-2xl'/> <span>32</span>
                                <AiOutlineEdit className='text-2xl ml-auto'/>
                            </div>
                        </div>

                        <div className='flex flex-col bg-white rounded-2xl shadow-lg'>
                            <div className='p-4'>
                                <Image src='/images/grasp_logo1.jpg' alt='Notes card' width={500} height={500} className='border-2 border-gray-100 rounded-lg' priority/>
                            </div>
                            <div className='p-4'>
                                <div className='text-lg hover:text-violet-800 hover:underline'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                            </div>
                            <div className='flex mt-auto p-4'>
                                <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                                <AiOutlineLike className='text-2xl'/> <span>32</span>
                                <AiOutlineEdit className='text-2xl ml-auto'/>
                            </div>
                        </div>

                        <div className='flex flex-col bg-white rounded-2xl shadow-lg'>
                            <div className='p-4'>
                                <Image src='/images/grasp_logo1.jpg' alt='Notes card' width={500} height={500} className='border-2 border-gray-100 rounded-lg' priority/>
                            </div>
                            <div className='p-4'>
                                <div className='text-lg hover:text-violet-800 hover:underline'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                            </div>
                            <div className='flex mt-auto p-4'>
                                <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                                <AiOutlineLike className='text-2xl'/> <span>32</span>
                                <AiOutlineEdit className='text-2xl ml-auto'/>
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



