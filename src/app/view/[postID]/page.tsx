
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
import { headers } from 'next/headers';


interface IParams {
    postID?: string;
}

const PostPage = async ( {params }: {params: IParams}) => {
    const headersList = headers();

    // Get the user-agent property value and assign it to a constant
    const userAgent = headersList.get('user-agent');
    console.log("userAgent: ", userAgent)
    
    // Let's check if the device is a mobile device
    let isMobileView = userAgent!.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );

    console.log("isMobileView: ", isMobileView, userAgent)

    const post = await getPostById(params);

    console.log("This post: ", post)
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
                isMobileView={isMobileView as RegExpMatchArray}
            />
        </ClientOnly>
    )

}

export default PostPage;



