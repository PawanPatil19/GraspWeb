import prisma from "@/app/libs/prismadb";

export default async function getCoursePlans(params: any) {
    const authorId = params;
    try {
        const plans = await prisma.coursePlan.findMany({
            where: {
                authorId: authorId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    

        return plans;
    } catch (error: any) {
        throw new Error(error);
    }
}