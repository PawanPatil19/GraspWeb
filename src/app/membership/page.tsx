'use client';

import React from 'react';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';



export default function Home() {
  const [isMonthlyPlan, setIsMonthlyPlan] = React.useState(true);
  const [isYearlyPlan, setIsYearlyPlan] = React.useState(false);

  const handleToggle = () => {
    setIsMonthlyPlan(!isMonthlyPlan);
    setIsYearlyPlan(!isYearlyPlan);
  }

  return (
    <main className="bg-white px-5 md:px-0">
      <div className='h-screen'>

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

            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <div className='mx-auto font-bold text-2xl md:text-4xl p-4 mt-10'>
                    Membership Plans
                </div>
                {/* Plan card */}
                <div className='w-full'>
                    {/* Create toggle button */}
                    <div className='flex justify-center mt-5 mb-10'>
                        <div className='flex justify-center w-3/4 md:w-1/6 bg-violet-800 rounded-full'>
                            <div className='flex justify-center w-1/2'>
                                <button onClick={handleToggle}
                                    className={isMonthlyPlan ? 'bg-white my-1 font-medium rounded-full px-4 py-2 text-center'
                                                : 'text-white my-1 font-medium rounded-full px-4 py-2 text-center'}>Monthly</button>
                            </div>
                            <div className='flex justify-center w-1/2'>
                                <button onClick={handleToggle}
                                    className={isYearlyPlan ? 'bg-white my-1 font-medium rounded-full px-4 py-2 text-center'
                                    : 'text-white my-1 font-medium rounded-full px-4 py-2 text-center'}>Yearly</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/4 border-2 border-gray-200 rounded-2xl shadow-lg mx-auto'>
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

      </div>
    </main>
  )
}



