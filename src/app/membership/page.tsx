'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineLike, AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
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
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='flex justify-end w-full'>
                    <div className='flex justify-end w-1/3'>
                        <div className='flex justify-end w-1/2'>
                            <input className='w-full border-b-2 px-4 py-2 text-center' type="text" placeholder="Search"/>
                            <AiOutlineSearch className='my-auto mx-2 text-2xl text-violet-800'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='mx-auto font-bold text-4xl p-4 mt-10'>
                    Membership Plans
                </div>
                {/* Plan card */}
                <div className='w-full'>
                    {/* Create toggle button */}
                    <div className='flex justify-center mt-5 mb-10'>
                        <div className='flex justify-center w-1/6 bg-violet-800 rounded-full'>
                            <div className='flex justify-center w-1/2'>
                                <button className='bg-white my-1 font-medium rounded-full px-4 py-2 text-center'>Monthly</button>
                            </div>
                            <div className='flex justify-center w-1/2'>
                                <button className='text-white my-1 font-medium rounded-full px-4 py-2 text-center'>Yearly</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-1/4 border-2 border-gray-200 rounded-2xl shadow-lg mx-auto'>
                        <div className='flex flex-col gap-6 my-8'>
                            <div className='flex justify-center'>
                                <span className='font-light'>MONTHLY</span>
                            </div>
                            <div className='flex justify-center'>
                                <span className='text-5xl font-extrabold'>$10.00</span>
                            </div>
                            <div className='flex justify-center'>
                                <ul className='list-inside'>
                                    <li className='text-sm font-light my-2'>
                                        <TiTick className='inline-block text-green-500 mr-2'/>
                                        Unlimited access to all notes
                                    </li>
                                    <li className='text-sm font-light my-2'>
                                        <TiTick className='inline-block text-green-500 mr-2'/>
                                        Unlimited access to all notes
                                    </li>
                                    <li className='text-sm font-light my-2'>
                                        <TiTick className='inline-block text-green-500 mr-2'/>
                                        Unlimited access to all notes
                                    </li>
                                    <li className='text-sm font-light my-2'>
                                        <TiTick className='inline-block text-green-500 mr-2'/>
                                        Unlimited access to all notes
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='max-w-screen-xl flex flex-wrap items-center justify-end mx-auto mt-10'>
                <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center'>Proceed to payment <AiOutlineArrowRight className='inline-block'/></button>
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



