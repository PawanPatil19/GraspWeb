import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    postID?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { postID } = params;

    console.log(postID);

    if (!postID || typeof postID !== "string") {
        throw new Error("Invalid postID");
    }

    let likeIds = [...(currentUser.likeIds || [])];

    likeIds.push(postID);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            likeIds,
        },
    });

    await prisma.post.update({
        where: {
            postID: postID,
        },
        data: { likes: { increment: 1 } },
    }).then((res) => {

        console.log(res.likes);
        return NextResponse.json(res);
    }).catch((err) => {
        console.log(err);
    });



    return NextResponse.json(user);

}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { postID } = params;

    if (!postID || typeof postID !== "string") {
        throw new Error("Invalid postID");
    }

    let likeIds = [...(currentUser.likeIds || [])];

    likeIds = likeIds.filter((id) => id !== postID);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            likeIds: likeIds,
        },
    });

    await prisma.post.update({
        where: {
            postID: postID,
        },
        data: { likes: { decrement: 1 } },
    });
    

    return NextResponse.json(user);
}
