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


    let {
        postID, 
        description,
        coursePlanId,
        newPlan
    } = body;

    const existingPost = await prisma.post.findUnique({
        where: {
            postID,
        },
    });

    // const updatePost = async (coursePlanId: string) => {
    //     console.log("here");
        
    //     console.log("existingPost: ", existingPost);

    //     if(existingPost) {
    //         console.log('coursePlan: ', coursePlanId);
    //         const updatedPost = await prisma.post.update({
    //             where: {
    //                 postID,
    //             },
    //             data: {
    //                 description: description,
    //                 coursePlanId: coursePlanId,
    //                 published: true,
    //                 updatedAt: new Date(),
    //             },
    //         });
    //         console.log("update ", updatedPost);
    //         return NextResponse.json(updatedPost);
    //     } else {
    //         console.log("here")
    //         return NextResponse.error();
    //     }
    // }


    if(coursePlanId === "1") {
        const coursePlan = await prisma.coursePlan.create(
            {
                data: {
                    title: newPlan,
                    authorId: currentUser.id,
                    authorName: currentUser.name as string,
                }
            }
        );

        coursePlanId = coursePlan.id;

        if(existingPost) {
            console.log('coursePlan: ', coursePlanId);
            const updatedPost = await prisma.post.update({
                where: {
                    postID,
                },
                data: {
                    description: description,
                    coursePlanId: coursePlanId,
                    published: true,
                    updatedAt: new Date(),
                },
            });
            console.log("update ", updatedPost);
            return NextResponse.json(updatedPost);
        } else {
            console.log("here")
            return NextResponse.error();
        }

        
        

    } else {
        if(existingPost) {
            console.log('coursePlan: ', coursePlanId);
            const updatedPost = await prisma.post.update({
                where: {
                    postID,
                },
                data: {
                    description: description,
                    coursePlanId: coursePlanId,
                    published: true,
                    updatedAt: new Date(),
                },
            });
            console.log("update ", updatedPost);
            return NextResponse.json(updatedPost);
        } else {
            console.log("here")
            return NextResponse.error();
        }
    }

    
    

    

    return NextResponse.error();
}