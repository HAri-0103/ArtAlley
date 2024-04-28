'use client';
import GridPost from '@/components/shadcn/GridPost';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiFilter, BiSearch } from 'react-icons/bi';
import SearchPost from '@/components/shadcn/SearchPost';

type Post = {
    _id: string;
    img: string;
    username: string;
};
export default function Explore() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleKeyPress = async(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                console.log(search);
                const res = await axios.put(`/api/Search`,{search});
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const display = async() => {
            try {
                const res = await axios.get("/api/Profile/Upload");
                setData(res.data.data)
                console.log(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        display();
    }, [])
    return (
        <div className="md:absolute md:left-0 lg:left-20 w-full md:w-[65vw] lg:w-[70vw] pb-10 pt-5 px-5 md:p-14 md:pb-0">
            <div className="">
                <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                <div className="flex gap-1 px-4 w-full justify-center items-center rounded-lg bg-dark-4">
                    <BiSearch className="text-white" size={24} />
                    <Input type='search'
                     placeholder='Search' className="explore-search"
                     value={search} onChange={(e)=> setSearch(e.target.value)}
                     onKeyPress={handleKeyPress}
                     /> 
                </div>
            </div>
            <div className='flex justify-between items-center w-full max-w-5xl mt-16 mb-7 '>
                <h3 className='body-bold md:h3-bold'>Popular Today</h3>
            </div>
            <div className='w-full flex justify-center items-center'>
                {search ?<div>{data.map((post:any) => (
                    <SearchPost key={post._id} props={post} />
                ))}</div> : <div className='grid grid-flow-row grid-cols-1 lg:grid-cols-2 content-center gap-2 bg-cover justify-items-center items-center'>{data.map((post:any) => (
                    <GridPost key={post._id} props={post} />
                ))}</div>}
            </div>
           </div>
    )
}