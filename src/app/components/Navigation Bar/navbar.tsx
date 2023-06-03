import Image from 'next/image';
import React from 'react';
import {VscAccount} from 'react-icons/vsc';
import {BiAnalyse, BiBell, BiLogOutCircle, BiBrightness} from 'react-icons/bi';
import { Dropdown } from "@nextui-org/react";


export default function Navbar(props: { 
  setShowLoginModal: (arg0: boolean) => void; 
  setShowRegisterModal: (arg0: boolean) => void;
  isUserLoggedIn: boolean;
 }) {
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
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
                <a href="/" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light" aria-current="page">Home</a>
              </li>

              <li className="md:py-2">
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">How it works</a>
              </li>

              <li className="md:py-2">
                <a href="/membership" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Membership</a>
              </li>

              <li className="md:py-2">
                <a href="/upload" className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Upload</a>
              </li>

              {/* Sign in button before sign in */}
              {props.isUserLoggedIn ? (
                <li className="md:py-2">
                  <button onClick={() => {props.setShowLoginModal(true);}} type='button' className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-violet-800 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 font-light">Sign in</button>
                </li>
              ) : (
              // <button onClick={() => setShowDropdown(!showDropdown)}>
              //   <VscAccount className='text-4xl text-gray-400'/>
              // </button>
               <Dropdown>
                  <Dropdown.Button light color={'secondary'}><VscAccount className='text-4xl text-gray-400'/></Dropdown.Button>
                  <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item key="new">
                      <a href="/creatorStudio" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">
                        <span className='items-center'>
                          <BiAnalyse size={20} className="inline-block"/> &nbsp;Creator Studio
                        </span>
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item key="copy">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">
                        <span className='flex justify-between'>
                          <span>
                            <BiBell size={20} className="inline-block"/> &nbsp;Notifications
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-medium leading-none text-red-100 bg-red-600 rounded-full">4</span>
                        </span>
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item key="edit">
                      <a href="/userSettings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-3">
                        <span className='items-center'>
                          <BiBrightness size={20} className="inline-block"/> &nbsp;Settings
                        </span>
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item key="delete" withDivider color="error">
                      <span className='items-center'>
                        <BiLogOutCircle size={20} className="inline-block"/> &nbsp;Sign Out
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Get started button before sign in */}
              {props.isUserLoggedIn ? (
                <li>
                  <button onClick={() => {props.setShowRegisterModal(true);}} type="button" className="text-white bg-violet-800 hover:bg-violet-500 focus:ring-4 focus:outline-none font-medium rounded-full px-4 py-2 text-center mb- ">Get started</button>
                </li>
              ) : null}

              {/* Profile dropdown after login */}
              {/* {showDropdown ? (
              <div className="absolute right:0 md:right-50 xl:right-50 z-20 mt-12 w-56 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" id="menu-dropdown">
                <div className="py-1" role="none">
                  <a href="/creatorStudio" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">
                    <span className='items-center'>
                      <BiAnalyse size={20} className="inline-block"/> &nbsp;Creator Studio
                    </span>
                  </a>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">
                    <span className='flex justify-between'>
                      <span>
                        <BiBell size={20} className="inline-block"/> &nbsp;Notifications
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-medium leading-none text-red-100 bg-red-600 rounded-full">4</span>
                    </span>
                  </a>
                  <a href="/userSettings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-3">
                    <span className='items-center'>
                      <BiBrightness size={20} className="inline-block"/> &nbsp;Settings
                    </span>
                  </a>
                </div>
                <div className="py-1" role="none">
                  <button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-4">
                    <span className='items-center'>
                      <BiLogOutCircle size={20} className="inline-block"/> &nbsp;Sign Out
                    </span>
                  </button>
                </div>
              </div> ) : null} */}


            </ul>
          </div>
          </div>
        </nav>
    );
}