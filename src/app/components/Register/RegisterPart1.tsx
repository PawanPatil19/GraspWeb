import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle, AiFillEyeInvisible, AiOutlineArrowRight } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import RegisterPart2 from './RegisterPart2';

export default function RegisterPart1(props: { setShowRegisterModal: (arg0: boolean) => void; setShowRegisterPart2Modal: (arg0: boolean) => void; }) {
    

    return (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-2 w-full md:w-4/6 my-6 ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-bold pt-2 text-violet-800">
                    Join Grasp !
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowRegisterModal(false)}
                  >
                   <AiOutlineCloseCircle/>
                  </button>
                </div>
                {/*body*/}
                <div className="grid grid-cols-1 md:grid-cols-11">
                  <div className='px-5 col-span-5'>
                    {/* email and password */}
                    <form>
                      <div className="flex mb-4">
                          <div className='mr-2'>
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
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" id="username" type="text" placeholder='abc@example.com' />
                      </div>
                      <div className="mb-4 ">
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                          Password
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" id="password" type="password" placeholder="******************" />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                          Confirm Password
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" id="password" type="password" placeholder="******************" />
                      </div>
                    </form>
                  
                
                  
                </div>

                <div className='mx-auto hidden md:block'>
                  <div className="-ml-0.5 w-0.5 h-full bg-gray-200"></div>
                </div>

                {/* or with lines */}
                <div className='md:hidden flex items-center justify-center m-5'>
                  <div className='w-2/4 h-0.5 bg-gray-200'></div>
                  <span className='px-4 text-gray-400'>or</span>
                  <div className='w-2/4 h-0.5 bg-gray-200'></div>
                </div>
                

                <div className='px-5 items-center my-auto col-span-5'>
                    <div className='flex w-full'>
                      {/* google login button */}
                      <button className='flex justify-center border-2 border-gray-100 bg-white rounded-full w-full text-black text-sm text-light px-3 py-2 hover:shadow'>
                        <FcGoogle className='text-2xl'/>
                        <span className='pl-2'>Sign up with Google</span>
                      </button>
                    </div>
                    {/* apple login button */}
                    <div className='flex items-center justify-center py-4'>
                      <button className='flex justify-center bg-white border-2 border-gray-100 w-full rounded-full text-black text-sm text-light px-3 py-2 hover:shadow'>
                        <AiFillApple className='text-2xl'/>
                        <span className='pl-2'>Sign up with Apple</span>
                      </button>
                    </div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex mx-auto my-5">
                <div>
                  <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-8 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => {props.setShowRegisterModal(false); props.setShowRegisterPart2Modal(true);}}>
                        Next <AiOutlineArrowRight className='inline-block'/>
                  </button>
                </div>
              </div>

              </div>

              

            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

          

          </>

          
    );
}