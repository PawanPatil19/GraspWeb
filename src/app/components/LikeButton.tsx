'use client';

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { SafeUser } from "../types";
import useLike from "../hooks/useLike";
import { use, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

interface LikeButtonProps {
    postID: string;
    postTitle?: string | null;
    postCreator?: string | null;
    currentUser?: SafeUser | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postID, postTitle, postCreator, currentUser }) => {
    
    const { hasLiked, toggleLike } = useLike({
        postID,
        currentUser
    });
    const [ isLiked, setLiked ] = useState(hasLiked);

    //const [isLoading, setIsLoading] = useState(false);

    const createNotification = async () => {
        const data = {
            notificationProviderId : currentUser?.id,
            notificationProviderName : currentUser?.name,
            notificationType : "like",
            notificationReceiverId : postCreator,
            postID : postID,
            postTitle : postTitle
        }
        await axios.post("/api/createNotification", data).then((res) => {
            console.log(res.data);
        });
    }

    

    const handleToggleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        setLiked(!isLiked);
        toggleLike(e);
        
        // setTimeout(() => {
        //     setIsLoading(false);
        // }
        // , 3500);

        if (!hasLiked) {
            createNotification();
        }
        
    }


    return (
        <div onClick={(e) => {
            handleToggleLike(e);
            //setIsLoading(true);
        }}>
             {
                // isLoading ? (
                //     <div>
                //         <TailSpin
                //             height="20"
                //             width="20"
                //             color="#000000"
                //             ariaLabel="tail-spin-loading"
                //             radius="1"
                //             wrapperStyle={{}}
                //             wrapperClass=""
                //             visible={true}
                //             />
                //     </div>
                // ) : (
                isLiked ? <button><AiFillLike className="text-2xl text-violet-800" /></button> 
                : <button><AiOutlineLike className="text-2xl" /></button>
            } 
            
        </div>
    )
}

export default LikeButton;
