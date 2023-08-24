import prisma from "@/app/libs/prismadb";

export default async function getCreatorNotifications(params: any) {
    try {
        const creatorID = params;

        const notifications = await prisma.notification.findMany({
            where: {
                notificationReceiverId: creatorID,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return notifications;
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}