
import React from 'react';

import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';

import AdminClient from './AdminClient';
import toast from 'react-hot-toast';
import getUsers from '../actions/getUsers';
import getAllPosts from '../actions/getAllPosts';


const AdminPage = async () => {

    const currentUser = await getCurrentUser();

    if(currentUser?.role != "ADMIN") {
        toast.error("You must be logged in to view this page");
        return null;
    }
    
    const posts = await getAllPosts();
    const users = await getUsers();
    
    if(!posts) {
        return null;
    }

    return (
        <ClientOnly>
            <AdminClient 
                posts={posts}
                users={users}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default AdminPage;



