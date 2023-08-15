import React from "react";
import getPosts from "./actions/getPosts";
import getCurrentUser from "./actions/getCurrentUser";
import { redirect } from "next/navigation";
import ClientOnly from "./components/ClientOnly";
import RootClient from "./RootClient";

export default async function Home() {
  const posts = await getPosts();
  const currentUser = await getCurrentUser();


  if (currentUser?.role == "ADMIN") {
    redirect("/admin");
  }

  return (
    <ClientOnly>
        <RootClient 
            posts={posts}
            currentUser={currentUser}
        />
    </ClientOnly>
  );
}
