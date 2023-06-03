import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle, AiFillEyeInvisible, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Combobox } from '@headlessui/react';
import { useState, Fragment } from 'react';


export default function RegisterPart2(props: { setShowRegisterModal: (arg0: boolean) => void; 
  setShowRegisterPart2Modal: (arg0: boolean) => void;
  setShowRegisterPart3Modal: (arg0: boolean) => void; }) {
  const universities = [
    {id: 0, name: "Select your university"},
    {id : 1, name : 'National University of Singapore'},
  ]
  const [selectedUniversity, setSelectedUniversity] = useState(universities[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? universities
      : universities.filter((university) => {
          return university.name.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/6 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-bold pt-2 text-violet-800">
                    Join Grasp !
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowRegisterPart2Modal(false)}
                  >
                   <AiOutlineCloseCircle/>
                  </button>
                </div>


                {/*body*/}

                <div className='flex w-2/4 mx-auto'>
                  <div className='flex flex-col w-full'>
                    <div className='w-full flex justify-center py-5'>
                      <div className="text-black font-medium text-2xl">Please tell us about you</div>
                    </div>
                    <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light">
                      <option>Select your university</option>
                      <option>National University of Singapore</option>
                      <option>Nanyang Technological University, Singapore</option>
                      <option>Others</option>
                    </select>

                    <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light">
                      <option>Select your course of study</option>
                      <option>Computer Science</option>
                      <option>Business</option>
                      <option>Others</option>
                    </select>
                  </div>
                    
                </div>


                
              {/*footer*/}
              <div className="flex mx-auto my-10">
                <div>
                  <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mx-2" type="button" onClick={() => {props.setShowRegisterModal(true); props.setShowRegisterPart2Modal(false);}}>
                        <AiOutlineArrowLeft className='inline-block'/> Back
                  </button>
                  <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mx-2" type="button" onClick={() => {props.setShowRegisterPart2Modal(false); props.setShowRegisterPart3Modal(true);}}>
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