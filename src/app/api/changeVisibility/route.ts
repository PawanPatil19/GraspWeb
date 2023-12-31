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
        published
    } = body;

    console.log("published ", published);

    const updateVisibility = await prisma.post.update({
        where: {
            postID,
        },
        data: {
            published: !published,
        }
    });



    return NextResponse.json(updateVisibility);
}