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

interface UserConfirmationModalProps {
    id?: string;
}


const UserConfirmationModal: React.FC<UserConfirmationModalProps>  = ({
    id
}) =>  {
    const confirmationModal = useConfirmationModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            id: id,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        data.id = id;
        axios.post('/api/deleteUser', data)
            .then(() => {
                console.log("Done")
                confirmationModal.onClose();
                
                toast.success("User deleted successfully.");
                window.location.reload();
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
            title="Do you want to delete this user?"
            actionLabel='Ok'
            secondaryLabel='Cancel'
            secondaryAction={confirmationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            //body={bodyContentPart1}
            // footer={footerContent}
        />);
            
    
    
}

export default UserConfirmationModal;