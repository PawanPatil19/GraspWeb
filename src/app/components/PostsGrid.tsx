'use client';

import { SafePost, SafeUser } from "../types";
import ClientOnly from "./ClientOnly";
import EmptyState from "./EmptyState";
import PostDisplay from "./PostDisplay";

interface PostProps {
    posts: SafePost[];
    currentUser?: SafeUser | null;
}

const PostsGrid: React.FC<PostProps> = ({
    posts,
    currentUser
}) => {
    if(posts.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        )
    }
    return(
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 md:p-4 mt-10'>
          {/* Card layout  */}
          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6'>
            {posts.map((post) => (
            <div key={post.postID}>
              <PostDisplay post={post} currentUser={currentUser} />
            </div>
            ))}

          </div>
        </div>
    )
}

export default PostsGrid;