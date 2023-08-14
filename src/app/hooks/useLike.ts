import axios from 'axios';
import { useRouter } from 'next/navigation';
import { use, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';

import useLoginModal from './useLoginModal';

interface IUseLike {
    postID: string;
    currentUser?: SafeUser | null;
}

const useLike = ({ postID, currentUser }: IUseLike) => {
    const router = useRouter();
  
    const loginModal = useLoginModal();
  
    const hasLiked = useMemo(() => {
      const list = currentUser?.likeIds || [];
  
      return list.includes(postID);
    }, [currentUser, postID]);
  
    const toggleLike = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
  
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      try {
        let request;
  
        if (hasLiked) {
          request = () => axios.delete(`/api/likes/${postID}`);
        } else {
          request = () => axios.post(`/api/likes/${postID}`);
        }
  
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    }, 
    [
      currentUser, 
      hasLiked, 
      postID, 
      loginModal,
      router
    ]);
  
    return {
      hasLiked,
      toggleLike,
    }
  }
  
  export default useLike;

