'use client';

import { SafePost } from "../types";
import ClientOnly from "./ClientOnly";
import EmptyState from "./EmptyState";
import PostDisplay from "./PostDisplay";

interface PostProps {
    posts: SafePost[];
}

const PostsGrid: React.FC<PostProps> = ({
    posts
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
              <PostDisplay post={post}/>
            </div>
            ))}

          </div>
        </div>
    )
}

export default PostsGrid;