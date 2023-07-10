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
        postID,
        title,
        content,
        displayContent
    } = body;

    // check if there is a post with the same postID, if yes update the post, else create a new post
    const existingPost = await prisma.post.findUnique({
        where: {
            postID,
        },
    });

    if(existingPost) {
        const updatedPost = await prisma.post.update({
            where: {
                postID,
            },
            data: {
                title,
                content,
                displayContent,
                updatedAt: new Date(),
            },
        });
        return NextResponse.json(updatedPost);
    } else {
        const post = await prisma.post.create({
            data: {
                postID,
                title,
                content,
                displayContent,
                authorName: currentUser.name,
                authorId: currentUser.id,
            },
        });
        return NextResponse.json(post);
    }

    return NextResponse.error();
}