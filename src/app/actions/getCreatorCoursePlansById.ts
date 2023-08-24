import prisma from "@/app/libs/prismadb";

export default async function getCreatorCoursePlansById(params: any) {
    try {
        const creatorID = params;
        const plans = await prisma.coursePlan.findMany({
            where: {
                authorId: creatorID,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return plans;
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}