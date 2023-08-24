
import React, { useEffect } from 'react';

import getPostById from "../../actions/getPostById";
import Avatar from '../../components/Avatar';
import ClientOnly from '@/app/components/ClientOnly';
import PostClient from './PostClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';


interface IParams {
    postID?: string;
}

const PostPage = async ( {params }: {params: IParams}) => {

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();


    if(!currentUser) {
        redirect('/');
        return null;
    }

    if(!post) {
        return null;
    }

    return (
        <ClientOnly>
            <PostClient 
                post={post}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default PostPage;



