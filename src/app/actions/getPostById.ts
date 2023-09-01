import prisma from "@/app/libs/prismadb";

interface IParams {
    postID? : string;
}

export default async function getPostById(params: IParams) {
    try {
        const { postID } = params;
        const post = await prisma.post.findUnique({
            where: {
                postID: postID,
            },
            include: {
                user: true,
            }
        });

        if (!post) {
            return null;
        }

        return {
            ...post,
            createdAt: post.createdAt.toString(),
            updatedAt: post.updatedAt.toString(),
        };
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}