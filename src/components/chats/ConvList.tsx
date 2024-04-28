
'use client'
import Box from "@/components/chats/Box";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ConvList() {
    const [user, setUser] = useState([]);
    useEffect(()=>{
        const data = async()=>{
            const res = await axios.get('/api/Message/Dashboard');
            setUser(res.data.data);
        }
        data()
    },[])
    console.log(user);
    return (
        <div className="md:w-[calc(100vw-290px)] h-screen bg-[#1F1D1D] flex text-center">
            <div className="fixed w-full md:w-[calc(100vw-290px)]  h-[70px] flex justify-center items-center text-2xl text-center p-2 bg-dark-2 z-10">
                <h1>
                    People
                </h1>
            </div>
            <div className="absolute w-full  top-[70px] flex flex-col mt-2 px-5 md:px-12">
            {user.map((data:any) => (
                <Box key={data._id} data={data} />
            ))}
            </div>
        </div>
    );
}