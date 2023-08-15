
import React from 'react';

import getPostById from "../../actions/getPostById";
import ClientOnly from '@/app/components/ClientOnly';
import EditorClient from './EditorClient';
import EditorClient1 from './EditorClient1';
import getCurrentUser from '@/app/actions/getCurrentUser';


interface IParams {
    postID?: string;
}

const EditorPage = async ( {params }: {params: IParams}) => {

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();
    //console.log(post);
    

    return (
        <ClientOnly>
            <EditorClient1
                post={post}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default EditorPage;



