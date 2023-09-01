// Search posts from prisma database

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { search } = body;
  console.log(search);

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        {
          name: {
              contains: search,
              mode: "insensitive",
          },
        },
        {
          email: {
              contains: search,
              mode: "insensitive",
          },
        }
      ]

    }
  });

  return NextResponse.json(users);
}
