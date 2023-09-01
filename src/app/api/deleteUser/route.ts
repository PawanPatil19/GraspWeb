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
        id,
    } = body;

    console.log("id: ", id);

    const deleteUser = await prisma.user.delete({
        where: {
            id: id,
        },
    });


    return NextResponse.json(deleteUser);
}