'use client';

import Image from 'next/image';

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {
    return (
        <Image 
            id='avatar'
            className="rounded-full"
            height="40"
            width="40"
            alt="Avatar"
            src={src || "/images/default_avatar.png"}
        />
    )
}

export default Avatar;