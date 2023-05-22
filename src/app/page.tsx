import Image from 'next/image'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai';

export default function Home() {
  return (
    <main className="bg-white">
      <div>
        <nav className="bg-white">
          {/* Navbar left */}
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <Image
                  src="/images/grasp_logo.jpeg"
                  alt="Vercel Logo"
                  width={150}
                  height={30}
                  priority
                />
          </a>
          {/* Navbar right */}
          <div className="hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              <li className="md:py-2">
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light" aria-current="page">Home</a>
              </li>
              <li className="md:py-2">
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">How it works</a>
              </li>
              <li className="md:py-2">
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Membership</a>
              </li>
              <li className="md:py-2">
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Sign in</a>
              </li>
              <li>
                <button type="button" className="text-white bg-violet-800 hover:bg-violet-500 focus:ring-4 focus:outline-none font-medium rounded-full px-4 py-2 text-center mb- ">Get started</button>
              </li>
            </ul>
          </div>
          </div>
        </nav>

        {/* Home page section before log in */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
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
              <button className='bg-white border-r-4 border-b-4 border-t-2 border-l-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-xl px-4 py-2 text-center '>
                Start taking your notes ->
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
        <div className='bg-white mx-20 my-10 p-4 h-screen'>
          {/* Card layout  */}
          <div className='grid grid-cols-1 w-full md:grid-cols-2'>
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
                        <button className='w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800'>Read -></button>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                      <div className='flex mt-auto'>
                        <AiOutlineEye className='text-2xl'/> <span className='pr-4'>20</span>
                        <AiOutlineLike className='text-2xl'/> <span>32</span>
                        <button className='w-1/3 mt-auto ml-auto  bg-white border-2 border-black rounded-full text-black text-sm text-light px-3 py-1 hover:text-white hover:bg-violet-800'>Read -></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}



