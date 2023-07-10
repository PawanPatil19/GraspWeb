import { use, useCallback, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";


interface ModalProps {
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
    step?: number;
}

const Modal: React.FC<ModalProps> = ({
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
    step,
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
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-bold pt-2 text-violet-800">
                    {title}
                  </h3>
                  <button className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                   <AiOutlineCloseCircle/>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {body}
                </div>
              
                {/*footer*/}
                <div className="flex flex-col pb-10">
                    <div className="flex items-center justify-center rounded-b gap-4 mx-10">
                        {secondaryAction && secondaryLabel && (
                            <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full" type="button" onClick={handleSecondaryAction}>
                                {secondaryLabel}
                            </button>
                            )
                        }
                        <button className=" bg-violet-800 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full" type="button" onClick={handleSubmit}>
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

export default Modal;