import prisma from "@/app/libs/prismadb";

export default async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        
        const safePosts = posts.map((post) => {
            return {
                ...post,
                createdAt: post.createdAt.toString(),
                updatedAt: post.updatedAt.toString(),
            };
        });

        return safePosts;
    } catch (error: any) {
        throw new Error(error);
    }
}