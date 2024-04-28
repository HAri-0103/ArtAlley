
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BoxProps {
    data:{
        avt:string;
        username:string;
        _id:string;
    }
}
export default function Box({data}:BoxProps) {
    return (
        <Link href={
            {
                pathname:'/Messages',
                query:{id:data._id}
            }
        } className="w-full md:w-[calc(100vw-400px)]  bg-dark-3 flex px-5 rounded-lg my-1 hover:scale-105">
            <div className='w-full flex justify-start items-center gap-3 py-2'>
            <Image className='w-16 h-16 rounded-full' src={data.avt} alt="box" width={400} height={400} />
            <div className='flex flex-col justify-between items-start'>
                <p className='text-white text-lg font-semibold'>{data.username}</p>
                <p className='text-gray-400 text-sm'>Last message</p>
            </div>
            </div>
            <h1 className='flex justify-end items-end py-2'>10:30</h1>
        </Link>
    );
}