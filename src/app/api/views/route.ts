// Search posts from prisma database
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { postID } = body;
  console.log(postID);

  await prisma.post.update({
    where: {
        postID: postID,
    },
    data: { views: { increment: 1 } },
  }).then((res: any) => {
    return NextResponse.json({ message: "success" });
  }).catch((err: any) => {
    console.log("err: ", err);
    return NextResponse.json({ message: "failed" });
  });

    return NextResponse.json({ message: "Views called" });
  


}
