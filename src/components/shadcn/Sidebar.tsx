'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { PiSignOutBold } from "react-icons/pi";
import Image from "next/image";
import {sidebarLinks} from "@/constants/nav";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { use, useEffect, useState } from "react";
import { features } from "process";

interface SidebarLink{
    icon:IconType,
    route:string,
    label:string,
}

export default function Sidebar(){
    const [data,setData] = useState({
        name:"",
        username:"",
        avt:""  
    });
    const path = usePathname();
    const router = useRouter();
    useEffect(()=>{
        const fetch = async()=>{
            try {
                const res = await axios.get("/api/Profile");
                setData(res.data);
            } catch (error) {
                console.log("error in fetching",error);
            }
        }
        fetch();
    },[]);

    
    const signOut = async() => {
        await toast.promise( axios.get("/api/Logout"), {
            loading: "Logging out...",
            success: "Logged out successfully",
            error: "Error logging out"
        });
        router.push("/Login");
    }
    return(
        <nav className="leftsidebar z-10">
            <div className="w-full flex flex-col items-start gap-11">
                <Link href={`/`} className="flex gap-3 items-center"><h1 className="w-[170px] h-[36px]">ArtAlley</h1></Link>
                <Link href={`/${data.username}`} className="flex-center gap-3">
                    <Image src={data.avt ||`/next.svg` } alt="" width={100} height={100} className="h-14 w-14 rounded-full"/>
                    <div className="flex flex-col">
                        <p className="body-bold">{data.name}</p>
                        <p className="small-regular text-light-3">@{data.username}</p>
                    </div>
                </Link>

                <ul className="flex flex-col items-start gap-6">
                    {sidebarLinks.map(({
                        icon:Icon,
                        route,
                        label
                    }:SidebarLink)=>{
                        const active = path === route;
                        return(
                            <Link href={route} key ={label} className={`leftsidebar-link group flex items-center h-10 ${active&&"bg-primary-500"}`}>
                                <h1 className="flex gap-4 items-center">
                                    <h1 className="group-hover:invert-white"> <Icon/> </h1>
                                    <h1>{label}</h1>
                                </h1>
                            </Link>
                        )
                    })}
                </ul>
            </div>

            <div className="flex flex-col items-start gap-6">
                <Button variant="ghost" className="shad-button_ghost" onClick={signOut}>
                    <PiSignOutBold className=" text-purple-600/80 rotate-180" size={24}/>
                    <p className="small-medium lg:base-medium">Logout</p>
                </Button>
            </div>
            <Toaster position="top-center" reverseOrder={true}/>
        </nav>
    )
}