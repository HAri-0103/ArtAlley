'use client'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";
import PostForm from "@/components/forms/PostForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function CreatePost() {
    const [post,setPost] = useState({
        _id:"",
        caption:"",
        tag:"",
        imageUrl:""
    });
    const search = useSearchParams();
    useEffect(() => {
        const id = search.get("id")
        const update = async()=>{
            const res=await axios.get(`/api/Post/update?id=${id}`);
            setPost(res.data.data);
        }
        update();
    })

    return (
        <div className="md:absolute md:left-0 flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start">
                    <MdOutlineAddPhotoAlternate
                    size={36} />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
                </div>

                <PostForm action="Update" post={post} />
            </div>
        </div>
    )
}