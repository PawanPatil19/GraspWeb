import prisma from "@/app/libs/prismadb";



export default async function getCoursePlanNameById(params: any) {
    try {
        const coursePlanId = params;
        const coursePlan = await prisma.coursePlan.findUnique({
            where: {
                id: coursePlanId,
            }
        });

        if (!coursePlan) {
            return null;
        }

        return {
            ...coursePlan,
            createdAt: coursePlan.createdAt.toISOString(),
        }
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}