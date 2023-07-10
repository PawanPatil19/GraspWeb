import { User } from '@prisma/client';
import { Post } from '@prisma/client';

export type SafePost = Omit<
    Post, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
    > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};