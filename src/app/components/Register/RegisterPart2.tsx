import { AiOutlineEye, AiOutlineLike, AiFillApple, AiOutlineCloseCircle, AiFillEyeInvisible, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Combobox } from '@headlessui/react';
import { useState, Fragment } from 'react';


export default function RegisterPart2({ prevStep, nextStep, setState, values, handleClose }: any) {
  const universities = [
    "Select your university",
    'National University of Singapore',
  ]

  const courses = [
    "Select your course",
    'Computer Science',
    'Business',
    'Others'
  ]

  const [step, setStep] = useState(values.step);
  const [firstName, setFirstName] = useState(values.firstName);
  const [lastName, setLastName] = useState(values.lastName);
  const [email, setEmail] = useState(values.email);
  const [password, setPassword] = useState(values.password);
  const [confirmPassword, setConfirmPassword] = useState(values.confirmPassword);
  const [university, setUniversity] = useState(values.university);
  const [course, setCourse] = useState(values.course);
  const [query, setQuery] = useState('')
  

  console.log("Values ", values);



  const filteredUniversities =
    query === ''
      ? universities
      : universities.filter((university) => {
          return university.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-2 w-full md:w-4/6 my-6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-bold pt-2 text-violet-800">
                    Join Grasp !
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                  >
                   <AiOutlineCloseCircle/>
                  </button>
                </div>


                {/*body*/}

                <div className='flex w-3/4 md:w-2/4 mx-auto'>
                  <div className='flex flex-col w-full'>
                    <div className='w-full flex justify-center py-5'>
                      <div className="text-black font-medium text-lg md:text-2xl">Please tell us about you</div>
                    </div>
                    <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light bg-gray-100" 
                      onChange={event => setUniversity(event.target.value)}>
                      <option value={universities[0]} disabled={true}>Select your university</option>
                      <option value={universities[1]}>National University of Singapore</option>
                      <option value={universities[2]}>Nanyang Technological University, Singapore</option>
                      <option>Others</option>
                    </select>

                    <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light bg-gray-100"
                      onChange={event => setCourse(event.target.value)}>
                      <option value={courses[0]}>Select your course of study</option>
                      <option value={courses[1]}>Computer Science</option>
                      <option value={courses[2]}>Business</option>
                      <option value={courses[3]}>Others</option>
                    </select>
                  </div>
                    
                </div>


                
              {/*footer*/}
              <div className="flex mx-auto my-10">
                <div>
                  <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mx-2" 
                    type="button" 
                    onClick={(e) => {e.preventDefault(); prevStep();}}>
                        <AiOutlineArrowLeft className='inline-block'/> Back
                  </button>
                  <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mx-2" 
                    type="button" 
                    onClick={(e) => {e.preventDefault(); nextStep();}}>
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