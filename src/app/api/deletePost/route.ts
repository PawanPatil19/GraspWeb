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
    } = body;

    const deletePost = await prisma.post.delete({
        where: {
            postID : postID,
        },
    });


    return NextResponse.json(deletePost);
}