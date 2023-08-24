
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPostsByCreatorId from '../actions/getPostsByCreatorId';
import CreatorStudioClient from './creatorStudioClient';
import toast from 'react-hot-toast';
import getCreatorCoursePlansById from '../actions/getCreatorCoursePlansById';
import getPostsByCreatorIdWithCoursePlans from '../actions/getPostsByCreatorIdWithCoursePlans';

const CreatorStudioPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        toast.error("You must be logged in to view this page");
        return null;
    }
    
    const posts = await getPostsByCreatorIdWithCoursePlans(currentUser?.id);

    
    if(!posts) {
        return null;
    }

    const coursePlans = await getCreatorCoursePlansById(currentUser?.id);

    if(!coursePlans) {
        return null;
    }

    const totalViews = posts.reduce((acc, post) => {
        return acc + post.views;
    }, 0);

    const totalLikes = posts.reduce((acc, post) => {
        return acc + post.likes;
    }, 0);

    return (
        <ClientOnly>
            <CreatorStudioClient 
                posts={posts}
                currentUser={currentUser}
                totalViews={totalViews}
                totalLikes={totalLikes}
                coursePlans={coursePlans}
            />
        </ClientOnly>
    )

}

export default CreatorStudioPage;



