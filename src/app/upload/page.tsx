
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPostsByCreatorId from '../actions/getPostsByCreatorId';
import UploadClient from './UploadClient';
import toast from 'react-hot-toast';
import getCreatorCoursePlansById from '../actions/getCreatorCoursePlansById';


// interface IParams {
//     creatorID?: string;
// }

const UploadPage = async () => {

    const currentUser = await getCurrentUser();
    if(!currentUser) {
        toast.error("You must be logged in to view this page");
        return null;
    }
    
    const posts = await getPostsByCreatorId(currentUser?.id);

    const coursePlans = await getCreatorCoursePlansById(currentUser?.id);

    
    // console.log(posts);
    
    if(!posts) {
        return null;
    }

    return (
        <ClientOnly>
            <UploadClient 
                posts={posts}
                currentUser={currentUser}
                coursePlans={coursePlans}
            />
        </ClientOnly>
    )

}

export default UploadPage;



