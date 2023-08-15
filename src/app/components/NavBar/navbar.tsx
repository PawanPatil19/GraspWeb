'use client';

import Image from 'next/image';
import React from 'react';
import {VscAccount} from 'react-icons/vsc';
import {BiAnalyse, BiBell, BiLogOutCircle, BiBrightness} from 'react-icons/bi';
import { Dropdown } from "@nextui-org/react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Avatar from '../Avatar';
import { redirect, usePathname } from 'next/navigation';


interface NavbarProps {
  currentUser? : SafeUser | null;
}

const navigation = [
  { name: 'Dashboard', href: '/admin' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}


const Navbar : React.FC<NavbarProps> = ({
  currentUser
}) => {
    // const [showDropdown, setShowDropdown] = React.useState(false);
    const [nav, setNav] = React.useState(false);
    const pathname = usePathname();

    const handleNav = () => {
      setNav(!nav);
    }

    const loginModal = useLoginModal();

    return (
      <>
        {
          currentUser?.role == "ADMIN" ? (
            <nav className="bg-white">
              {/* Navbar left */}
              <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className='flex'>
                  <a href="/" className="z-10">
                    <Image
                          src="/images/grasp_logo.png"
                          alt="Vercel Logo"
                          width={100}
                          height={30}
                          priority
                        />
                  </a>

                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                          pathname === item.href
                              ? 'border-slate-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={pathname === item.href ? 'page' : undefined}
                      >
                          {item.name}
                      </a>
                      ))}
                  </div>
                </div>

                {/* Navbar right */}
                <div className="flex justify-end w-full md:w-auto md:order-1" id="navbar-cta">
                  <ul className="hidden font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:flex md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                    <Dropdown>
                        <Dropdown.Button light color={'secondary'}>
                            <VscAccount className='text-4xl text-gray-400'/>
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                          <Dropdown.Section>
                            <Dropdown.Item key="display">
                              <span>Admin</span>
                            </Dropdown.Item>
                          </Dropdown.Section>
                          <Dropdown.Item key="delete" withDivider color="error">
                            <button onClick={() => signOut()}>
                              <span className='items-center'>
                                <BiLogOutCircle size={20} className="inline-block"/> &nbsp;Sign Out
                              </span>
                            </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                  </ul>
                  <div onClick={handleNav} className="md:hidden">
                    <AiOutlineMenu size={30} className="text-gray-400 inline-block"/>
                  </div>
                </div>
              </div>

              <div className={ nav ? "md-hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}>
                <div
                  className={
                    nav
                      ? "fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500 animate-in fade-in slide-in-from-left"
                      : "fixed left-[-100%] top-0 ease-in duration-500 animate-in fade-in slide-in-from-left"
                  }>
                  <div>
                    <div className="flex justify-end w-full items-center">
                      <div onClick={handleNav} className="rounded-full shadow-gray-400 p-1 cursor-pointer hover:bg-gray-700 hover:text-white hover:scale-125">
                          <AiOutlineClose size={20} />
                      </div>
                    </div>
                    
                    <div className="py-4 flex flex-col">
                      <ul className="text-xl">
                    
                        <div>
                            <li className="py-4">
                                <a href="#" className="block py-2 pl-3 pr-4 text-red-500  font-light">Sign Out</a>
                            </li>
                        </div>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>

            </nav>
          
          ) : (
            <nav className="bg-white">
              {/* Navbar left */}
              <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center z-10">
                  <Image
                        src="/images/grasp_logo.png"
                        alt="Vercel Logo"
                        width={150}
                        height={30}
                        priority
                      />
                </a>
                {/* Navbar right */}
                <div className="flex justify-end w-full md:w-auto md:order-1" id="navbar-cta">
                  <ul className="hidden font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:flex md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                    
                    <li className="md:py-2">
                      <a href="/" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light" aria-current="page">Home</a>
                    </li>

                    <li className="md:py-2">
                      <a href="/guide" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">How it works</a>
                    </li>

                    {currentUser == null ? (
                      <li className="md:py-2">
                        <button onClick={loginModal.onOpen} className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Upload</button>
                      </li>
                    ) : (
                    <li className="md:py-2">
                        <a href="/upload" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Upload</a>
                    </li>
                    )}

                    {/* Sign in button before sign in */}
                    {currentUser == null ? (
                      <li className="">
                        <button onClick={loginModal.onOpen} type='button' className="text-white bg-violet-800 hover:bg-violet-500 focus:ring-4 focus:outline-none font-medium rounded-full px-4 py-2 text-center">Sign in</button>
                      </li>
                    ) : (


                    <Dropdown>
                        <Dropdown.Button light color={'secondary'}>
                          {currentUser?.image == null ? 
                            (<VscAccount className='text-4xl text-gray-400'/>)
                            : (<Avatar src={currentUser?.image}/>)
                          }
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                          <Dropdown.Section>
                            <Dropdown.Item key="display">
                              <span>Hi, {currentUser.name} 👋</span>
                            </Dropdown.Item>
                          </Dropdown.Section>
                          
                          <Dropdown.Section>
                          <Dropdown.Item key="new">
                            <a href="/creatorStudio" className="text-gray-700 block py-2 text-sm" role="menuitem" id="menu-item-0">
                              <span className='items-center'>
                                <BiAnalyse size={20} className="inline-block"/> &nbsp;Creator Studio
                              </span>
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Item key="copy">
                            <a href="#" className="text-gray-700 block py-2 text-sm" role="menuitem" id="menu-item-1">
                              <span className='flex justify-between'>
                                <span>
                                  <BiBell size={20} className="inline-block"/> &nbsp;Notifications
                                </span>
                                <span className="inline-block px-2 py-1 text-xs font-medium leading-none text-red-100 bg-red-600 rounded-full">4</span>
                              </span>
                            </a>
                          </Dropdown.Item>
                          </Dropdown.Section>
                          <Dropdown.Item key="delete" withDivider color="error">
                            <button onClick={() => {
                              signOut();
                              redirect('/');
                            }}>
                              <span className='items-center'>
                                <BiLogOutCircle size={20} className="inline-block"/> &nbsp;Sign Out
                              </span>
                            </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}

                  </ul>
                  <div onClick={handleNav} className="md:hidden">
                    <AiOutlineMenu size={30} className="text-gray-400 inline-block"/>
                  </div>
                </div>
              </div>

              <div className={ nav ? "md-hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}>
                <div
                  className={
                    nav
                      ? "fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500 animate-in fade-in slide-in-from-left"
                      : "fixed left-[-100%] top-0 ease-in duration-500 animate-in fade-in slide-in-from-left"
                  }>
                  <div>
                    <div className="flex justify-end w-full items-center">
                      <div onClick={handleNav} className="rounded-full shadow-gray-400 p-1 cursor-pointer hover:bg-gray-700 hover:text-white hover:scale-125">
                          <AiOutlineClose size={20} />
                      </div>
                    </div>
                    
                    <div className="py-4 flex flex-col">
                      <ul className="text-xl">
                        <li className="py-4">
                          <a href="/" className="block py-2 pl-3 pr-4 text-gray-400 font-light" aria-current="page">Home</a>
                        </li>

                        <li className="py-4">
                          <a href="/guide" className="block py-2 pl-3 pr-4 text-gray-400 font-light">How it works</a>
                        </li>

                        <li className="py-4">
                          <a href="/upload" className="block py-2 pl-3 pr-4 text-gray-400 font-light">Upload</a>
                        </li>

                        {currentUser == null  ? (
                          <div>
                            <li className="py-4">
                              <a href="/creatorStudio" className="block py-2 pl-3 pr-4 text-gray-400  font-light">Creator Studio</a>
                            </li>
                            <li className="py-4">
                              <a href="#" className="block py-2 pl-3 pr-4 text-gray-400  font-light">Notifications</a>
                            </li>
                            {/* <li className="py-4">
                              <a href="/userSettings" className="block py-2 pl-3 pr-4 text-gray-400  font-light">Settings</a>
                            </li> */}
                            <li className="py-4">
                              <a href="#" className="block py-2 pl-3 pr-4 text-red-500  font-light">Sign Out</a>
                            </li>

                          </div>
                          ) : 
                          <li className="py-4">
                            <button onClick={loginModal.onOpen} type='button' className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Sign in</button>
                          </li>
                        }
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>

            </nav>
        )
      }
        </>
    );
}

export default Navbar;