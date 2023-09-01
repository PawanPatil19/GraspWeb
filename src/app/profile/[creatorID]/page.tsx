
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ProfileClient from './ProfileClient';
import toast from 'react-hot-toast';
import getCreatorCoursePlansById from '../../actions/getCreatorCoursePlansById';
import getPostsByCreatorIdWithCoursePlans from '../../actions/getPostsByCreatorIdWithCoursePlans';
import { headers } from 'next/headers';

interface IParams {
    creatorID?: string;
}

const ProfilePage = async ({params }: {params: IParams}) => {
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
    
    const posts = await getPostsByCreatorIdWithCoursePlans(params.creatorID);

    
    if(!posts) {
        return null;
    }

    const coursePlans = await getCreatorCoursePlansById(params.creatorID);

    if(!coursePlans) {
        return null;
    }


    return (
        <ClientOnly>
            <ProfileClient 
                posts={posts}
                currentUser={currentUser}
                coursePlans={coursePlans}
                isMobileView={isMobileView as RegExpMatchArray}
            />
        </ClientOnly>
    )

}

export default ProfilePage;



