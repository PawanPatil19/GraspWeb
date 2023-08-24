
import React from 'react';

import getPostById from "../../actions/getPostById";
import ClientOnly from '@/app/components/ClientOnly';
import EditorClient from './EditorClient';
import EditorClient1 from './EditorClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getCreatorCoursePlansById from '@/app/actions/getCreatorCoursePlansById';


interface IParams {
    postID?: string;
}

const EditorPage = async ( {params }: {params: IParams}) => {

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();
    const creatorCoursePlans = await getCreatorCoursePlansById(currentUser?.id);
    //console.log(post);
    

    return (
        <ClientOnly>
            <EditorClient1
                post={post}
                currentUser={currentUser}
                coursePlans={creatorCoursePlans}
            />
        </ClientOnly>
    )

}

export default EditorPage;



