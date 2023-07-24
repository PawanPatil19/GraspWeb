'use client';

import axios from 'axios';
import { useCallback, useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '@/app/components/modals/Modal';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(registerModal.step);


    const nextStep = useCallback(() => {
        setStep(step + 1);
    }, [step]);

    const prevStep = useCallback(() => {
        setStep(step - 1);
    }, [step]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            // university: '',
            // course: '',
        },
    });

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                toast.success("Account created successfully.");
            })
            .catch((error) => {
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContentPart1 = (
        <div className="flex flex-col">
            <div className='px-5'>
                {/* email and password */}
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" 
                            id="name" type="text" placeholder=' ' {...register("name")} disabled={isLoading} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" 
                            id="email" type="text" placeholder=' ' {...register("email")} disabled={isLoading} required />
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" 
                            id="password" type="password" placeholder=' ' {...register("password")} disabled={isLoading} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" 
                            id="confirmPassword" type="password" placeholder=' ' {...register("confirmPassword")} disabled={isLoading} required/>
                    </div>
                </form>
            </div>
        </div>
    )


    const bodyContentPart2 = (
        <div className='flex flex-col w-full px-5'>
            <div className='w-full flex justify-center py-5'>
                <div className="text-black font-medium text-lg md:text-2xl">Please tell us about you</div>
            </div>
            <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light bg-gray-100" 
                {...register("university")}>
                <option disabled={true} value="">Select your university</option>
                <option value={universities[1]}>National University of Singapore</option>
                <option value={universities[2]}>Nanyang Technological University, Singapore</option>
                <option>Others</option>
            </select>

            <select className="form-select my-3 px-2 py-3 block w-full rounded-lg text-gray-600 font-light bg-gray-100"
                {...register("course")}>
                <option value='' disabled={true}>Select your course of teaching</option>
                <option value={courses[1]}>Computer Science</option>
                <option value={courses[2]}>Business</option>
                <option value={courses[3]}>Others</option>
            </select>
        </div>
            
    )


    // const footerContent = (
    //     <div className='flex flex-col px-5'>
    //         {/* or with lines */}
    //         <div className='flex items-center justify-center m-5'>
    //             <div className='w-2/4 h-0.5 bg-gray-200'></div>
    //             <span className='px-4 text-gray-400'>or</span>
    //             <div className='w-2/4 h-0.5 bg-gray-200'></div>
    //         </div>
            

    //         <div className='px-5 items-center my-auto'>
    //             <div className='flex w-full'>
    //             {/* google login button */}
    //             <button 
    //                 className='flex justify-center border-2 border-gray-100 bg-white rounded-full w-full text-black text-sm text-light px-3 py-2 hover:shadow'
    //                 onClick={() => signIn('google')}    
    //             >
    //                 <FcGoogle className='text-2xl'/>
    //                 <span className='pl-2'>Sign up with Google</span>
    //             </button>
    //             </div>
    //             {/* apple login button */}
    //             <div className='flex items-center justify-center pt-4'>
    //             <button 
    //                 className='flex justify-center bg-white border-2 border-gray-100 w-full rounded-full text-black text-sm text-light px-3 py-2 hover:shadow'
    //                 onClick={() => signIn('github')}
    //             >
    //                 <AiFillGithub className='text-2xl'/>
    //                 <span className='pl-2'>Sign up with Github</span>
    //             </button>
    //             </div>
    //         </div>

    //         <div className='flex justify-start px-5 pt-8'>
    //             <span className='text-sm text-gray-400'>Already have an account?</span>
    //             <button className='text-sm text-violet-800 pl-2'>Log in</button>
    //         </div>
    //     </div>
    // )

    // switch (step) {
    //     case 1:
            return (<Modal
                    disabled={isLoading}
                    isOpen={registerModal.isOpen}
                    onClose={registerModal.onClose}
                    title="Register"
                    actionLabel='Register'
                    onSubmit={handleSubmit(onSubmit)}
                    body={bodyContentPart1}
                    // footer={footerContent}
                />);
        // case 2:
        //     return (<Modal
        //         disabled={isLoading}
        //         isOpen={registerModal.isOpen}
        //         onClose={registerModal.onClose}
        //         title="Register"
        //         actionLabel='Submit'
        //         secondaryLabel='Back'
        //         onSubmit={handleSubmit(onSubmit)}
        //         secondaryAction={prevStep}
        //         body={bodyContentPart2}
        //     />);
        // }
            
    
    
}

export default RegisterModal;