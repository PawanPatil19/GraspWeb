import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }


    const body = await request.json();
    const { 
        notificationProviderId,
        notificationProviderName,
        notificationType,
        notificationReceiverId,
        postID,
        postTitle,
    } = body;

    
    const notification = await prisma.notification.create({
        data: {
            notificationProviderId : notificationProviderId,
            notificationProviderName : notificationProviderName,
            notificationType : notificationType,
            notificationReceiverId : notificationReceiverId,
            postID : postID,
            postTitle : postTitle,
        },
    });

    return NextResponse.json(notification);
}