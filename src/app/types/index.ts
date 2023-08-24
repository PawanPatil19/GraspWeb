import { CoursePlan, User } from '@prisma/client';
import { Post } from '@prisma/client';

export type SafePost = Omit<
    Post, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type SafeCoursePlan = Omit<
    CoursePlan, "createdAt" | "updatedAt"> & {
    createdAt: string;
};

export type SafePostWithPlan = Omit<
    Post, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    coursePlan: CoursePlan;
};

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
    > & {
    createdAt: string;
    updatedAt: string;
};

