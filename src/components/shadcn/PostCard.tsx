'use client'
import Image from "next/image";
import Link from "next/link";
import PostStats from "./PostStats";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";

interface PostCardProps {
    props:{
        _id:string,
        username:string,
        avt:string,
        name:string,
        caption:string,
        img:string,
        tag:string,
        likes:number,
        saved:number,
    }
}
export default function PostCard({props}:PostCardProps) {

    const sepTag = props.tag?.split(",");
    const [isUser, setIsUser] = useState(false);
    useEffect(()=>{
        const fetch = async()=>{
            try {
                const res = await axios.get("/api/Post");
                if(res.statusText==="Unauthorized"){
                    setIsUser(false);
                }
                setIsUser(true);
            }catch (error) {
                console.log("error in fetching",error);
            }
        }
        fetch();
    },[]);
    return (
        <div className="post-card">
            <div className="flex-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/${props.username}`}>
                            <Image src={props.avt} alt="Profile Picture" width={50} height={50} className="rounded-full w-12 lh:h-12" />
                        </Link>

                        <div className="flex flex-col">
                            <p className="base-medium lg:body-bold text-light-1">
                                {props.name}
                            </p>
                            <div className="flex-center gap-2 text-light-3">
                                <p className="subtle-semibold lg:small-regular">{"5 mins ago"}</p>
                            </div>
                        </div>
                    </div>
            </div> 
            <Link href={'/'}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{props.caption}</p>
                    {sepTag?.map((tag) => (
                        <span key={tag} className="tag">#{tag} </span>
                    ))}
                </div>
                <Image className="post-card_img rounded-lg" src={props.img} alt="Post" width={300} height={300} />
            </Link>
                <PostStats id={props._id}/>
        </div>
    )
}
