
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import toast from 'react-hot-toast';
import getPostsByCreatorIdWithCoursePlans from '../../actions/getPostsByCreatorIdWithCoursePlans';
import CoursePlanPageClient from './coursePlanPageClient';
import getCoursePlanNameById from '@/app/actions/getCoursePlanName';

interface IParams {
    coursePlanID?: string;
}

const CreatorStudioPage = async ({params }: {params: IParams}) => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        toast.error("You must be logged in to view this page");
        return null;
    }
    
    const posts = await getPostsByCreatorIdWithCoursePlans(currentUser?.id);

    if(!posts) {
        return null;
    }

    const coursePlan = await getCoursePlanNameById(params.coursePlanID);

    // const coursePlans = await getCreatorCoursePlansById(currentUser?.id);

    // if(!coursePlans) {
    //     return null;
    // }

    return (
        <ClientOnly>
            <CoursePlanPageClient 
                posts={posts}
                currentUser={currentUser}
                coursePlan={coursePlan}
            />
        </ClientOnly>
    )

}

export default CreatorStudioPage;



