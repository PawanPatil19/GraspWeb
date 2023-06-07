'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { BiNavigation, BiEditAlt, BiFolderPlus, BiSave } from 'react-icons/bi';
import {VscSettings} from 'react-icons/vsc';
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

  

  const handleClick = () => {
    redirect('/upload');
  };

  return (
    <main className="bg-white">
      <div className='flex flex-col h-screen'>
        <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} isUserLoggedIn={isUserLoggedIn}/>

        <div className='w-screen'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-10 rounded-2xl bg-white'>
                <input className='w-full border-b-2 px-4 py-2 text-3xl focus:outline-none focus:border-violet-800 focus-visible:' type="text" placeholder="Write your title here..."/>
            </div>
        </div>
        <div className='h-full w-screen'>
            <div className='h-full grid grid-cols-12 border-t-2 bg-white'>
                <div className='col-span-1 bg-gray-100'>
                    <div className='flex flex-col justify-center items-center mt-10'>
                        <BiNavigation className='text-4xl text-gray-400 my-7'/>
                        <BiEditAlt className='text-4xl text-gray-400 my-7'/>
                        <BiFolderPlus className='text-4xl text-gray-400 my-7'/>
                        <BiSave className='text-4xl text-gray-400 my-7'/>
                    </div>
                </div>
                <div className='col-span-9'>

                </div>
                <div className='col-span-2 bg-gray-100 px-5'>
                    <div className='flex flex-col h-full py-5'>
                        <div>
                            <span className='flex font-light text-gray-500'><VscSettings className='text-2xl' /> &nbsp; Tools</span>
                        </div>
                        <div className='mt-auto mx-auto'>
                            <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center'>
                                Upload
                            </button>
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



