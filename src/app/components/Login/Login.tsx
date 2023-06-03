import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export default function Login({ setShowLoginModal } : { setShowLoginModal: any }) {
    return (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-bold pt-2 text-violet-800">
                    Welcome Back !
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowLoginModal(false)}
                  >
                   <AiOutlineCloseCircle/>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* google login button */}
                  <div className='flex w-full'>
                    <button className='flex justify-center border-2 border-gray-100 bg-white rounded-full w-full text-black text-sm text-light px-3 py-2 hover:shadow'>
                      <FcGoogle className='text-2xl'/>
                      <span className='pl-2'>Sign in with Google</span>
                    </button>
                  </div>
                  {/* apple login button */}
                  <div className='flex items-center justify-center py-4'>
                    <button className='flex justify-center bg-white border-2 border-gray-100 w-full rounded-full text-black text-sm text-light px-3 py-2 hover:shadow'>
                      <AiFillApple className='text-2xl'/>
                      <span className='pl-2'>Sign in with Apple</span>
                    </button>
                  </div>
                  {/* or with lines */}
                  <div className='flex items-center justify-center m-5'>
                    <div className='w-2/4 h-0.5 bg-gray-200'></div>
                    <span className='px-4 text-gray-400'>or</span>
                    <div className='w-2/4 h-0.5 bg-gray-200'></div>
                  </div>
                  {/* email and password */}
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">
                        Email
                      </label>
                      <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" id="username" type="text" placeholder='abc@example.com' />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                        Password
                      </label>
                      <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" id="password" type="password" placeholder="******************" />
                      <div className="flex justify-between items-center">
                        <div>
                          <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" />
                          <label className="text-xs text-violet-800 px-2" htmlFor="showPassword">Remember Me</label>
                        </div>

                        <label className="text-xs text-violet-800" htmlFor="forgotPassword">Forgot password?</label>
                      </div>
                      
                    </div>
                  </form>
                </div>
              
                {/*footer*/}
                <div className="flex items-center justify-between p-6 rounded-b">
                  <span>
                    <label className="inline-block text-xs text-light text-black">New to Grasp? &nbsp;</label>
                    <a className="inline-block text-xs text-light text-violet-800 hover:text-violet-500" href="#">
                          Sign up here
                    </a>
                  </span>
                  <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => setShowLoginModal(false)}>
                        Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
    );
}