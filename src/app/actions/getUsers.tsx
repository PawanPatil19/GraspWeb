import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: "USER",
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        
        const safeUsers = users.map((user) => {
            return {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            };
        });

        return safeUsers;
    } catch (error: any) {
        throw new Error(error);
    }
}