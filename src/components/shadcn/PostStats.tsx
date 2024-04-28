'use client'
import { FaHeart, FaRegHeart,FaBookmark,FaRegBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";

interface PostStatsProps {
    id:string,
}

export default function PostStats({id}:PostStatsProps) {
    const [likes, setLikes] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [numLiked, setNumLiked] = useState<Number>(0);
    const [numSaved, setNumSaved] = useState<Number>(0);
    const like = async() => {
        try{
            const no = await axios.post("/api/Post/PostStats",{id:id});
            if(no.statusText==="unliked"){
                setLikes(false);
            }else{
                setLikes(true);
            }
            setNumLiked(no.data.data);
        }
        catch(error){
            console.log("error in liking",error);
        }
    }


    const savecount = async()=>{
        try{
            const no = await axios.put("/api/Post/PostStats/Saved",{id:id});
            if(no.statusText==="unsaved"){
                setBookmarked(false);
            }
            else{
                setBookmarked(true);
            }
            setNumSaved(no.data.data);
            console.log(no.data.data);
        }catch(error){
            console.log("error in saving",error);
        }
    }

        useEffect(()=>{
            const find = async()=>{
                try {
                    const data = await axios.get("/api/Post/PostStats");
                    let already = data.data.data.find((item:any)=>item.postId===id);
                    const length = await axios.put("/api/Post/PostStats",{id:id});
                    if(already){
                        setLikes(true);
                    }
                    else{
                        setLikes(false);
                    }
                    setNumLiked(length.data.data.likes);
                    const savedData = await axios.get("/api/Post/PostStats/Saved");
                    let alreadySaved = savedData.data.data.find((item:any)=>item.postId===id);
                    if(alreadySaved){
                        setBookmarked(true);
                    }
                    else{
                        setBookmarked(false);
                    }

                    setNumSaved(length.data.data.saved);
                } catch (error) {
                    console.log("error in fetching",error);
                }
            }
            find();
        },[])
    return (
        <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={like}>
                        {likes ? <FaHeart size={20} className="fill-red text-rose-500" /> : <FaRegHeart size={20} className="text-gray-500" />}
                    </div>
                    <p className="small-medium lg:base-medium">{(numLiked)?.toString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={savecount}>
                    {bookmarked?<FaBookmark size={20} className=" fill-blue-700" />:<FaRegBookmark size={20} className=" text-gray-500" />}
                    </div>
                    <p className="small-medium lg:base-medium">{(numSaved)?.toString()}</p>
                </div>
            </div>
    )
}