'use client';

import axios from 'axios';
import { useCallback, useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import Modal from '@/app/components/modals/Modal';

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

    // const bodyContentPart1 = (
    //     <div className="flex justify-end">
    //         <div className='py-5'>

    //         </div>
    //     </div>
    // )

    return (<Modal
            disabled={isLoading}
            isOpen={confirmationModal.isOpen}
            onClose={confirmationModal.onClose}
            title="Do you want to delete this post?"
            actionLabel='Ok'
            secondaryLabel='Cancel'
            secondaryAction={confirmationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            //body={bodyContentPart1}
            // footer={footerContent}
        />);
            
    
    
}

export default ConfirmationModal;