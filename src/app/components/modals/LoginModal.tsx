'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import {useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from '@/app/components/modals/Modal';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    };

    const bodyContent = (
        <div className="relative px-6 flex-auto">
            {/* google login button */}
            {/* <div className='flex w-full'>
                <button className='flex justify-center border-2 border-gray-100 bg-white rounded-full w-full text-black text-sm text-light px-3 py-2 hover:shadow'
                    onClick={() => signIn('google')}>
                    <FcGoogle className='text-2xl'/>
                    <span className='pl-2'>Sign in with Google</span>
                </button>
            </div> */}
            {/* apple login button */}
            {/* <div className='flex items-center justify-center py-4'>
                <button className='flex justify-center bg-white border-2 border-gray-100 w-full rounded-full text-black text-sm text-light px-3 py-2 hover:shadow'
                    onClick={() => signIn('github')}>
                    <AiFillGithub className='text-2xl'/>
                    <span className='pl-2'>Sign in with Apple</span>
                </button>
            </div> */}
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
                    <input 
                        className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" 
                        id="email" type="text" placeholder='' {...register("email")} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                    Password
                    </label>
                    <input 
                        className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" 
                        id="password" type="password" placeholder="" {...register("password")} />
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
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            title="Login"
            actionLabel='Log in'
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            
        />
    );

            
    
    
}

export default LoginModal;