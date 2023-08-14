'use client';

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { SafeUser } from "../types";
import useLike from "../hooks/useLike";
import { use, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface LikeButtonProps {
    postID: string;
    currentUser?: SafeUser | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postID, currentUser }) => {

    const { hasLiked, toggleLike } = useLike({
        postID,
        currentUser
    });

    const [isLoading, setIsLoading] = useState(false);

    

    const handleToggleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        toggleLike(e);
        setTimeout(() => {
            setIsLoading(false);
        }
        , 3500);

    }


    

    return (
        <div onClick={(e) => {
            handleToggleLike(e);
            setIsLoading(true);
        }}>
             {
                isLoading ? (
                    <div>
                        <TailSpin
                            height="20"
                            width="20"
                            color="#000000"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                    </div>
                ) : (
                hasLiked ? <button><AiFillLike className="text-2xl text-violet-800" /></button> 
                : <button><AiOutlineLike className="text-2xl" /></button>
            )
            } 
            
        </div>
    )
}

export default LikeButton;
