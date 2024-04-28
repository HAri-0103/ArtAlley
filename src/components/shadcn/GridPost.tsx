'use client'

import { useEffect } from "react"
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
    props:{
        _id:string,
        avt:string,
        name:string,
        caption:string,
        img:string,
        tag:string,
        likes:number,
        saved:number,
        username:string,
    }
}

export default function GridPost({props}:PostCardProps) {
    return(
        <Link href={`/${props.username}`} key={props._id} className=" bg-dark-3 rounded-lg p-2">
        <Image src={props.img} alt="post" className="w-[900px] h-[500px] flex justify-center items-center rounded-lg" width={700} height={500}/>
    </Link>
    )
}