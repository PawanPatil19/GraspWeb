import prisma from "@/app/libs/prismadb";

export default async function getCreatorNotifications(params: any) {
    try {
        const creatorID = params;

        // update all the notifications to read
        await prisma.notification.updateMany({
            where: {
                notificationReceiverId: creatorID,
            },
            data: {
                statusRead: true,
            }
        });
        
    } catch (error : any) {
        console.error(error);
        throw new Error(error);
    }
}