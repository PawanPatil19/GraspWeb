import prisma from "@/app/libs/prismadb";

interface IParams {
    creatorID? : string;
}

export default async function getPostById(params: IParams) {
    try {
        const { creatorID } = params;
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

        return posts;
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}