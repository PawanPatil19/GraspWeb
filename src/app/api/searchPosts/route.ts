// Search posts from prisma database

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { searchQuery } = body;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      title: {
        contains: searchQuery,
      },
    },
  });

  return NextResponse.json(posts);
}
