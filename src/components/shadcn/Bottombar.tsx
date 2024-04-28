'use client'


import { bottombarLinks } from "@/constants/nav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";

interface bottombarLinksProps{
    icon:IconType,
    route:string,
    label:string,
}


export default function Bottombar(){
    const path = usePathname();
    return(
        <ul className="bottom-bar">
                    {bottombarLinks.map(({
                        icon:Icon,
                        route,
                        label
                    }:bottombarLinksProps)=>{
                        const active = path === route;
                        return(
                            <li key ={label} className={`${active&&"bg-primary-500 rounded-[10px]"} flex-center flex-col gap-1 p-2 transition`}>
                                <Link href={route} className="flex flex-col gap-4 items-center ">
                                    <h1 className="group-hover:invert-white"> <Icon size={17}/> </h1>
                                    <h1 className=" tiny-medium text-light-2">{label}</h1>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
    )
}