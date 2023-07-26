import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Success({ handleClose }: any) {
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-2 w-full md:w-4/6 my-6 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 rounded-t">
                        <h3 className="text-lg font-bold pt-2 text-violet-800">
                            Join Grasp !
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 float-right text-gray-300 text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => handleClose()}
                        >
                        <AiOutlineCloseCircle/>
                        </button>
                    </div>

                    {/*body*/}
                    Success

                </div>
            </div>
        </div>
    )
}