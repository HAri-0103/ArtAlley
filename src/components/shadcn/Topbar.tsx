'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { PiSignOutBold } from "react-icons/pi";
import Image from "next/image";
import axios from "axios";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Topbar(){
    const [data,setData] = useState({
        name:"",
        username:"",
        avt:""  
    });
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
        <section className="topbar w-full flex justify-between items-center px-5 z-10">
            <div className="flex flex-between py-4">
                <Link href="/" className="flex gap-3 items-center">ArtAlley</Link>
            </div>
            <div className="flex gap-3">
            <Button variant="ghost" className="shad-button_ghost" onClick={signOut}>
                        <PiSignOutBold className=" text-purple-600/80 rotate-180" size={24}/>
                    </Button>
                <Link href={`/${data.username}`} className="flex-center gap-3">
                    <Image src={data.avt} alt="" width={100} height={100} className="h-9 w-9 rounded-full"/>
                </Link>
            </div>
            <Toaster position="top-center" reverseOrder={true}/>
        </section>
    )
};