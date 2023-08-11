
import React, { useEffect } from 'react';

import getPostById from "../../actions/getPostById";
import Avatar from '../../components/Avatar';
import ClientOnly from '@/app/components/ClientOnly';
import PostClient from './PostClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import axios from 'axios';


interface IParams {
    postID?: string;
}

const PostPage = async ( {params }: {params: IParams}) => {

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();
    //console.log(post);

    
    
    
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



