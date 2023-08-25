import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@prisma/client";
import axios from "axios";

export async function POST(
    request: Request
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { 
        postID,
    } = body;


    const currPost = await prisma.post.findUnique({
        where: {
            postID: postID,
        }
    });

    

    const newPostId = uuidv4();
    if(!currPost) {
        return NextResponse.error();
    }
    
    console.log(currPost.title);
    const newPost = await prisma.post.create({
        data: {
            postID: newPostId,
            title: currPost.title,
            content: currPost.content,
            uploadFiles: currPost.uploadFiles,
            authorName: currentUser.name as string,
            authorId: currentUser.id,
            published: false,
            parentPostAuthorId: currPost.authorId,
            parentPostId: currPost.postID,
        }
    });
    console.log(newPost);

    const createNotification = async () => {
        const data = {
            notificationProviderId : currentUser?.id,
            notificationProviderName : currentUser?.name,
            notificationType : "like",
            notificationReceiverId : currPost.authorId,
            postID : postID,
            postTitle : currPost.title,
        }
        await axios.post("/api/createNotification", data).then((res) => {
            console.log(res.data);
        });
    }

    createNotification();

    return NextResponse.json(newPost);
}
