import prisma from "@/app/libs/prismadb";


export default async function getPostsByCreatorIdWithCoursePlans(params: any) {
    try {
        const creatorID = params;

        const posts = await prisma.post.findMany({
            where: {
                authorId: creatorID,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                coursePlan: true,
            }
        });

        if (!posts) {
            return null;
        }

        const safePosts = posts.map((post) => {
            return {
                ...post,
                createdAt: post.createdAt.toISOString(),
                updatedAt: post.updatedAt.toISOString(),
                coursePlan: {
                    ...post.coursePlan,
                }
            };
        });

        return safePosts;
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}