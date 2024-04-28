'use client'


import GridPost from "@/components/shadcn/GridPost";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Saved() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const saved =async() =>{
            try {
                const res = await axios.get('/api/SavedPost');
                setPosts(res.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        saved();
    });
    return (
        <div className="md:absolute md:left-0 lg:left-20 w-full lg:w-[80vw] flex flex-1 pb-10 md:pb-0">
            <div className="home-container">
                <div className="home-posts">
                    <p className="w-full text-center h3-bold md:h2-bold ">Saved Posts</p>
                </div>
                <div className='w-full flex justify-center items-center'>
               <div className=' grid grid-flow-row grid-cols-1 lg:grid-cols-2 content-center gap-2 bg-cover justify-items-center items-center'>
                {posts.map((post:any) => (
                    <GridPost key={post._id} props={post} />
                ))}</div>
                </div>
            </div>
        </div>
    )
}