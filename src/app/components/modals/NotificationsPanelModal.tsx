'use client';

import { useState } from "react";

import NotificationsModal from '@/app/components/modals/NotificationsModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useNotificationsModal from '@/app/hooks/useNotificationsModal';
import NotificationCard  from "../NotificationCard";

interface NotificationsModelProps {
    notifications? : Notification[] | null;
}


const NotificationsPanelModal: React.FC<NotificationsModelProps> = ({
    notifications
}) => {
    const router = useRouter();
    const notificationsModal = useNotificationsModal();
    const [isLoading, setIsLoading] = useState(false);

    console.log("Notifications: ", notifications);

    const bodyContent = (
        <div className="relative px-2 flex flex-col gap-4">
            {
                notifications?.map((notif, index) => (
                    <div className="bg-gray-100 rounded-3xl" key={index}>
                        <NotificationCard notification={notif} />
                    </div>
                ))
            }
        </div>
    )

    return (
        <NotificationsModal
            disabled={isLoading}
            isOpen={notificationsModal.isOpen}
            onClose={notificationsModal.onClose}
            body={bodyContent}
        />
    ); 
}

export default NotificationsPanelModal;