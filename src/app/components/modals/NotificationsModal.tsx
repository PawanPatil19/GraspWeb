import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";


interface NotificationModalProps {
    isOpen?: boolean;
    onClose: () => void;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    postID?: string;
}

const NotificationsModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    body,
    footer,
    disabled,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);


    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="max-w-screen-xl mx-auto flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-11/12 mx-auto md:ml-auto md:w-1/3 top-20 ">

                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-96 overflow-y-scroll ">

                    {/*header*/}
                    <div className="flex items-center justify-between p-5 rounded-t">
                    <h3 className="text-lg font-light pt-2 px-6 text-black">
                        Notifications
                    </h3>
                    <button className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={handleClose}
                    >
                        <AiOutlineClose className="text-sm"/>
                    </button>
                    </div>

                    {/*body*/}
                    <div className="relative px-6 flex-auto">
                    {body}
                    </div>
                    
                </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
        </>
    );
}

export default NotificationsModal;