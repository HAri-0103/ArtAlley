'use client'
import ProfileTop from '@/components/shadcn/profile';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';




export default function ProfilePage(){
    const [isUser, setIsUser] = useState(false);
    const [userData, setuserData] = useState({
        id:"",
        avt:"",
        name:"",
        username:"",
    });
    const [posts, setPosts] = useState([]);
    const {profile} = useParams();




    useEffect(() => {
        const display = async() => {
            try {
                const res = await axios.get(`/api/Post?username=${profile}`);
                const post = await axios.get(`/api/UserPost?username=${profile}`);
                setPosts(post.data.data);
                if(res.status === 201){
                    setIsUser(false);
                    setuserData(res.data);
                    return;
                }
                setIsUser(true);
                setuserData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        display();
    })

    return(
        <div className="md:absolute md:left-0 lg:left-20 w-full md:w-[65vw] lg:w-[70vw] pb-16 pt-5 px-5 md:p-14 md:pb-0 space-y-10">
            <div className="flex items-center justify-center">
                <h1 className="w-full text-center text-6xl font-bold">Profile</h1>
            </div>
            <div className="flex justify-between items-center mt-5 text-white">
                    <div className="flex items-center">
                            <Image src={userData.avt} width={100} height={100} className="rounded-full" alt={''} />
                            <div className='ml-5'>
                                <h1 className="text-xl font-bold">{userData.name}</h1>
                                <p className="text-gray-500">{userData.username}</p>
                            </div>
                    </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl font-bold">Posts</h1>
            </div>

            <div className="grid justify-items-center justify-center items-center grid-cols-1 lg:grid-cols-3 gap-5">
                {Array.isArray(posts)?(posts.map((post:any) => (
                    <ProfileTop key={post._id} props={post} />
                ))) : (
                    <p>No Post</p>
                )}
            </div>
       </div>
    )
}
