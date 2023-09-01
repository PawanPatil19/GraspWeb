'use client';

import axios from 'axios';
import { useCallback, useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import PopupModal from '@/app/components/modals/PopupModal';

import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';

interface ConfirmationModalProps {
    postID?: string;
}


const ConfirmationModal: React.FC<ConfirmationModalProps>  = ({
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
            postID: postID,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        data.postID = postID;
        axios.post('/api/deletePost', data)
            .then(() => {
                console.log("Done")
                confirmationModal.onClose();
                
                toast.success("Post deleted successfully.");
                window.location.replace('/upload');
            })
            .catch((error) => {
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className='text-xs font-light px-6'>
            All the content of this post will be deleted. This action cannot be undone.
        </div>
    )

    return (<PopupModal
            disabled={isLoading}
            isOpen={confirmationModal.isOpen}
            onClose={confirmationModal.onClose}
            title="Delete this post?"
            actionLabel='Delete'
            secondaryLabel='No'
            secondaryAction={confirmationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            // footer={footerContent}
        />);
            
    
    
}

export default ConfirmationModal;