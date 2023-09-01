'use client';

import axios from 'axios';
import { useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import PopupModal from '@/app/components/modals/PopupModal';

import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';
import { FaRegClone } from 'react-icons/fa';

interface CloneConfirmationModalProps {
    postID?: string;
}


const CloneConfirmationModal: React.FC<CloneConfirmationModalProps>  = ({
    postID
}) =>  {
    const confirmationModal = useConfirmationModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            postID : postID
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        data.postID = postID;
        toast.promise(
            axios.post(`/api/clonePost`, data),
            {
                loading: 'Cloning post...',
                success: 'Post cloned successfully',
                error: 'Error cloning post'
            }
        ).then((res) => {
            console.log(res.data);
            redirect('/upload');
        }).catch((err) => {
            console.log(err);
        });
    };
    
    const bodyContent = (
        <div className='text-xs font-light px-6'>
            All the content of this post will be copied to a new post. You can edit the new post after cloning.
        </div>
    )


    return (<PopupModal
            disabled={isLoading}
            isOpen={confirmationModal.isOpen}
            onClose={confirmationModal.onClose}
            title="Clone this post?"
            actionLabel='Clone'
            secondaryLabel='No'
            secondaryAction={confirmationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />);
            
    
    
}

export default CloneConfirmationModal;