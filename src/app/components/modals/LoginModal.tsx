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
            
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">
                    Email
                    </label>
                    <input 
                        className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 focus:outline focus:outline-violet-400" 
                        id="email" type="text" placeholder='' {...register("email")} />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                    Password
                    </label>
                    <input 
                        className="appearance-none rounded-lg w-full py-2 px-3 text-black bg-gray-100 mb-2 focus:outline focus:outline-violet-400" 
                        id="password" type="password" placeholder="" {...register("password")} />
                </div>
                <div>
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