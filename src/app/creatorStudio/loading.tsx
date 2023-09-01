import { CircularProgress } from "@mui/material";


export default function Loading() {
    return (
        <div className='flex flex-col h-screen justify-center items-center bg-white'>
            <CircularProgress color="inherit" size={60} />
        </div>
    )
}   