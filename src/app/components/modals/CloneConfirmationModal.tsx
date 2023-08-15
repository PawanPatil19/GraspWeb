'use client';

import axios from 'axios';
import { useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import Modal from '@/app/components/modals/Modal';

import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';

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


    return (<Modal
            disabled={isLoading}
            isOpen={confirmationModal.isOpen}
            onClose={confirmationModal.onClose}
            title="Do you want to clone this post?"
            actionLabel='Clone'
            secondaryLabel='Cancel'
            secondaryAction={confirmationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />);
            
    
    
}

export default CloneConfirmationModal;