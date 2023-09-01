// Search posts from prisma database

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { currentUserID, authorID,  parentPostID } = body;


    const post = await prisma.post.findMany({
        where: {
            AND: [
                {
                    parentPostId: {
                        equals: parentPostID,
                    }
                },
                {
                    authorId: {
                        equals: currentUserID
                    }
                },
                {
                    parentPostAuthorId: {
                        equals: authorID
                    }
                }
            ],
        }
    });
  
    return NextResponse.json(post);
}
