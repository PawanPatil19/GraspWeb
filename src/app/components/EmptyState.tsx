'use client';

import { redirect, useRouter } from 'next/navigation';

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "No posts yet",
    subtitle = "Try changing or clearing your filters",
    showReset
}) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center bg-white py-10">
            <div className="text-center">
                <h1 className="text-4xl font-semibold">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
                {showReset && (
                    <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => router.push("/")}
                    >
                        Reset filters
                    </button>
                )}
            </div>
        </div>
    )
}

export default EmptyState;