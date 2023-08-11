// Search posts from prisma database

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { search } = body;
  console.log(search);

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
      
    },
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
      description: {
        contains: search,
        mode: "insensitive",
      },
      authorName: {
        contains: search,
        mode: "insensitive",
      },
      published: true,
    },
  });

  return NextResponse.json(posts);
}
