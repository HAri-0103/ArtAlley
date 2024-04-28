import { Button } from "../ui/button";
import Image from 'next/image';
import PostStats from "./PostStats";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Link from "next/link";

interface userDataProps {
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

export default function ProfileTop({props}:userDataProps){
    const deletePost = async(id:string)=>{
        try {
            console.log(id);
            const res = await axios.put(`/api/Post`,{id:id});
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="w-[400px] h-fit border flex flex-col justify-between p-5 gap-y-2 rounded-lg">
            <Image src={props.img} alt="profile" width={400} height={400} className="rounded-lg"/>
            <div className="flex justify-between items-center">
                <PostStats id={props._id} />
                <div className="flex justify-center items-center gap-3">
                <Link href={{
                        pathname:"/Update",
                        query:{id:props._id},
                    }}>
                        <Image className="" src={'/update.svg'} alt="Update" width={20} height={20} />
                    </Link>
                    <MdDelete className="text-2xl text-white cursor-pointer" onClick={()=>{deletePost(props._id)}}/>
                </div>
            </div>
        </div>
    )
}