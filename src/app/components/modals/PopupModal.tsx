import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";


interface PopupModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
    postID?: string;
}

const PopupModal: React.FC<PopupModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
    postID
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


    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative mx-2 w-full md:w-1/3 my-6  max-w-3xl">

              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*header*/}
                <div className="flex items-center justify-between p-5 rounded-t">
                  <h3 className="text-lg font-semibold pt-2 px-6 text-black">
                    {title}
                  </h3>
                  <button className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                   <AiOutlineClose className="text-sm"/>
                  </button>
                </div>

                {/*body*/}
                <div className="relative px-6 pb-5 flex-auto">
                  {body}
                </div>
              
                {/*footer*/}
                <div className="flex flex-col pb-10">
                    <div className="flex items-center justify-end rounded-b gap-4 mx-10">
                        {secondaryAction && secondaryLabel && (
                            <button className="bg-gray-200 hover:bg-gray-300 text-black text-sm py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline " type="button" onClick={handleSecondaryAction}>
                                {secondaryLabel}
                            </button>
                            )
                        }
                        <button className=" bg-violet-800 hover:bg-violet-500 text-white text-sm py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                {actionLabel}
                        </button>
                    </div>
                    <div>
                        {footer}
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
        </>
    );
}

export default PopupModal;