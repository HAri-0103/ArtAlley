'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/shadcn/PostCard";

export default function Home() {
    const [data, setData] = useState([]);
    const display = async() => {
        try {
            const res = await axios.get("/api/Profile/Upload");
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        display();
    }, []);
    return (
        <div className="md:absolute md:left-0 lg:left-20 w-full lg:w-[60vw] flex flex-1 pb-10 md:pb-0">
            <div className="home-container">
                <div className="home-posts">
                    <p className="w-full text-left h3-bold md:h2-bold ">Home Feed</p>
                    {data.map((post:any) => (
                        <PostCard key={post._id} props={post} />
                    ))}
                </div>

            </div>

        </div>
    );
}