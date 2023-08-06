'use client';

import axios from 'axios';
import { useCallback, useState } from "react";
import { SafePost } from "@/app/types";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useUploadModal from '@/app/hooks/useUploadModal';
import Modal from '@/app/components/modals/Modal';

import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';



const UploadModal = () =>  {
    const uploadModal = useUploadModal();
    const [isLoading, setIsLoading] = useState(false);
    const [createPlan, setCreatePlan] = useState(false);

    const params = useParams();
    //console.log(params);
    const postID = params?.postID;
    //console.log(postID);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            postID: postID,
            description: "",
            coursePlanId: "",
            newPlan: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        data.postID = postID;
        axios.post('/api/uploadPost', data)
            .then(() => {
                console.log("Done")
                uploadModal.onClose();
                
                toast.success("Published");
                window.location.replace('/upload');
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
                {/* add a textbox */}
                <form>
                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-700 py-2">
                            Description
                        </label>
                        <textarea 
                            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" 
                            placeholder="Write a description..."
                            {...register("description", { required: true })}
                        />
                    </div>

                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-700 py-2">
                            Course plan
                        </label>
                        <select 
                            className="w-full border-2 border-gray-300 p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" 
                            {...register("coursePlanId", { required: true })}
                            onChange={(e) => {
                                if(e.target.value === "1") {
                                    setCreatePlan(true);
                                } else {
                                    setCreatePlan(false);
                                }
                            }}
                        >
                            <option value="">Select a plan</option>
                            <option value="1">Create a new plan</option>
                            <option value="2">Plan 1</option>
                        </select>
                    </div>

                    {createPlan && (
                        <div className='mb-2'>
                            <label className="block text-sm font-medium text-gray-700 py-2">
                                Create new plan
                            </label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-300 p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                                {...register("newPlan", { required: true })}
                            />
                        </div>
                    )}
                    
                </form>

            </div>
        </div>
    )

    return (<Modal
            disabled={isLoading}
            isOpen={uploadModal.isOpen}
            onClose={uploadModal.onClose}
            title="Upload"
            actionLabel='Publish'
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContentPart1}
            // footer={footerContent}
        />);
            
    
    
}

export default UploadModal;