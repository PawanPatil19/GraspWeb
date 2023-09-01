"use client";

import {Button } from '@tremor/react';

import { SafePost, SafeUser } from "@/app/types";

import React from "react";
import UserTable from "./userTable";
import PostTable from './postsTable';
import useRegisterModal from '../hooks/useRegisterModal';
import UserConfirmationModal from '../components/modals/UserConfirmationModal';

interface AdminClientProps {
  posts: SafePost[];
  users: SafeUser[];
  currentUser?: SafeUser | null;
}

const AdminClient: React.FC<AdminClientProps> = ({ posts, users, currentUser }) => {
    const registerModal = useRegisterModal();
  

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto p-4 mt-10 ">
        <div className='w-full flex justify-end'>
            <Button size="xs" variant="secondary" color="violet" onClick={registerModal.onOpen}>
                + Add User
            </Button>
        </div>
        
        <UserTable users={users} />
        <PostTable posts={posts} />
    </div>
  );
};

export default AdminClient;
