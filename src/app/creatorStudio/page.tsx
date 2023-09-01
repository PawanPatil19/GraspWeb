
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import CreatorStudioClient from './creatorStudioClient';
import toast from 'react-hot-toast';
import getCreatorCoursePlansById from '../actions/getCreatorCoursePlansById';
import getPostsByCreatorIdWithCoursePlans from '../actions/getPostsByCreatorIdWithCoursePlans';
import { headers } from 'next/headers';

const CreatorStudioPage = async () => {
    const headersList = headers();

    // Get the user-agent property value and assign it to a constant
    const userAgent = headersList.get('user-agent');
    console.log("userAgent: ", userAgent)
    
    // Let's check if the device is a mobile device
    let isMobileView = userAgent!.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );


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
                isMobileView={isMobileView as RegExpMatchArray}
            />
        </ClientOnly>
    )

}

export default CreatorStudioPage;



