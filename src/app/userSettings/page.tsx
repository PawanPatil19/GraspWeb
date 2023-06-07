'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineLike, AiOutlineEdit, AiOutlineArrowRight, AiOutlineDownCircle } from 'react-icons/ai';
import {FaUserCircle} from 'react-icons/fa';
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
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(true);

  const [isAccountSelected, setIsAccountSelected] = React.useState(true);
  const [isPasswordSelected, setIsPasswordSelected] = React.useState(false);
  const [isNotificationsSelected, setIsNotificationsSelected] = React.useState(false);

  const [showMenuDiv, setShowMenuDiv] = React.useState(false);

  const handleNavigation = (index: number) => {
    if (index == 0) {
        setIsAccountSelected(true);
        setIsPasswordSelected(false);
        setIsNotificationsSelected(false);
    } else if (index == 1) {
        setIsAccountSelected(false);
        setIsPasswordSelected(true);
        setIsNotificationsSelected(false);
    } else if (index == 2) {
        setIsAccountSelected(false);
        setIsPasswordSelected(false);
        setIsNotificationsSelected(true);
    } else {
        setIsAccountSelected(true);
        setIsPasswordSelected(false);
        setIsNotificationsSelected(false);
    }
  }
  

  const handleClick = () => {
    redirect('/upload');
  };

  return (
    <main className="bg-white px-5 md:px-0">
      <div className='mb-10'>
        <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} isUserLoggedIn={isUserLoggedIn}/>

        <div className='h-full md:h-screen'>

            {/* User profile settings */}
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto mt-10 rounded-2xl bg-white'>
                <div className='flex justify-center w-full my-10'>
                    <div className='grid grid-cols-1 md:grid-cols-5 md:divide-x-2'>
                        <div className='w-full flex justify-center mx-auto'>
                            <div className='flex flex-col col-span-1 mx-2'>
                                <div>
                                    <FaUserCircle className='mx-auto text-9xl text-gray-300'/>
                                </div>
                                <div className='flex justify-center text-2xl font-medium mt-2 mb-5 items-center'>
                                    User Name 
                                    <span>
                                        <button onClick={() => setShowMenuDiv(!showMenuDiv)}>
                                            <AiOutlineDownCircle className='mx-2 text-xl text-gray-500'/>
                                        </button>
                                    </span>
                                </div>
                                {showMenuDiv && (
                                    <div className=''>
                                        <div className={isAccountSelected 
                                            ? 'flex justify-center my-3 text-white py-3 bg-violet-800 rounded-full' 
                                            : 'flex justify-center my-3 text-gray-400'} 
                                            onClick={() => handleNavigation(0)}>
                                                <button>Account</button>
                                        </div>
                                        <div className={isPasswordSelected 
                                            ? 'flex justify-center my-3 text-white py-3 bg-violet-800 rounded-full' 
                                            : 'flex justify-center my-3 text-gray-400'} 
                                            onClick={() => handleNavigation(1)}>
                                            <button>Password</button>
                                        </div>
                                        <div className={isNotificationsSelected 
                                            ? 'flex justify-center my-3 text-white py-3 bg-violet-800 rounded-full' 
                                            : 'flex justify-center my-3 text-gray-400'} 
                                            onClick={() => handleNavigation(2)}>
                                            <button>Notifications</button>
                                        </div>  
                                    </div> )}                         
                            </div>
                        </div>

                        

                        <div className='w-full flex justify-center mx-auto md:mx-6 col-span-4'>
                            <div className='flex flex-col mx-0 md:mx-10'>
                                <div className='justify-start text-2xl font-medium mt-2 mb-5 hidden md:block'>
                                    User Profile Details
                                </div>
                                <div className=''>
                                    <form>
                                        <div className="md:flex mb-4">
                                            <div className='mb-4 md:mr-2'>
                                                <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" id="username" type="text" placeholder='' />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" id="username" type="text" placeholder='' />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">
                                            Email
                                            </label>
                                            <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" id="username" type="text" value='abc@example.com' />
                                        </div>
                                        <div className="mb-4 ">
                                            <label className="block text-gray-700 text-sm font-light mb-2" >
                                            University
                                            </label>
                                            <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" id="university"  value="National University of Singapore" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-light mb-2" >
                                            Portfolio URL
                                            </label>
                                            <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" id="portfolio" placeholder="https://" />
                                        </div>
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Update button */}
                <div className='flex justify-center w-full'>
                    <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-semibold rounded-xl px-4 py-2 text-center'>
                        Update
                    </button>
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



