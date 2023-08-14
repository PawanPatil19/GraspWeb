import prisma from "@/app/libs/prismadb";

// interface IParams {
//     creatorID? : ;
// }

export default async function getPostsByCreatorId(params: any) {
    try {
        const creatorID = params;
        console.log('creatorID: ', creatorID);
        const posts = await prisma.post.findMany({
            where: {
                authorId: creatorID,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: true,
            }
        });

        if (!posts) {
            return null;
        }

        const safePosts = posts.map((post) => {
            return {
                ...post,
                createdAt: post.createdAt.toString(),
                updatedAt: post.updatedAt.toString(),
            };
        });

        return safePosts;
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}