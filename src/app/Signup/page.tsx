'use client';
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

export default function Signup() {
    const {edgestore} = useEdgeStore();
    const router = useRouter();
    const [avt, setAvt] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const [data,setData] = useState({
        name:"",
        username:"",
        emailid:"",
        password:"",
        img:""
    });
    const [error, setError] = useState<boolean>(false);
    
    const submit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await edgestore.publicFiles.upload({
                file:avt!
            });  
            setData({...data,img:res.url});
            const form = new FormData();
            form.append("name",data.name);
            form.append("username",data.username);
            form.append("emailid",data.emailid);
            form.append("password",data.password);
            form.append("img",res.url);
            console.log(form);

            if (data.name.length < 3) {
                toast.error("Name should be at least 3 characters");
                return setError(true);
            }

            if (data.username.length < 3) {
                toast.error("Username should be at least 3 characters");
                return setError(true);
            }

            if (!data.emailid.endsWith("@gmail.com")) {
                toast.error("Enter a valid email (Gmail only)");
                return setError(true);
            }
            await toast.promise(axios.post("/api/Signup", form), {
                loading: "Signing up...",
                success: "Signup Successfull",
                error: "Error in Signup",
                
            });
            router.push("/");
            setError(false);
        } catch (error) {
            console.error("Error in Signup:", error);
            toast.error("Error in Signup");
        }
    }
    return (
        <div className={`absolute  w-full h-full lg:h-screen flex justify-center items-center text-black`}>
            <div className="w-[90%] h-[80%] bg-white rounded-lg">
                <form onSubmit={submit} className="w-full h-full flex flex-col justify-center items-center gap-5">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                    <div className="text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold">ArtAlley</h1>
                    <p className="text-sm lg:text-lg text-blue-400">Welcome, Please enter your detail. </p>
                    </div>

                    <div>
                    
                    <div className="flex flex-col justify-center items-center w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold" htmlFor="avatar">{preview?<Image className="w-[125px] h-[125px] rounded-full" src={preview} alt="" width={200} height={200}/>:<CgProfile size={125}/>}</label>
                        <input type="file" id="avatar" className="hidden" onChange={({target})=>{
                            if(!target.files) return;
                            setAvt(target.files?.[0]);
                            setPreview(URL.createObjectURL(target.files[0]));
                        }}/>
                    </div>
                        
                    <div className="flex flex-col justify-center items-start w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold">Name</label>
                        <input type="text" name="name" placeholder={error?"Please fill all the field":"Name"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={data.name} onChange={e=>setData({...data,name:e.target.value})}/>
                    </div>

                    <div className="h-10 flex flex-col justify-center items-start w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold">Username</label>
                <input type="text" name="username" placeholder={error?"Please fill all the field":"UserName"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={data.username} onChange={e=>setData({...data,username:e.target.value})}/>
                    </div>

                    <div className="flex flex-col justify-center items-start w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold">EmailId</label>
                        <input type="email" name="emailid" placeholder={error?"Please fill all the field":"EmailId"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={data.emailid} onChange={e=>setData({...data,emailid:e.target.value})}/>
                    </div>
    
                    <div className="flex flex-col justify-center items-start w-full mt-5 ">
                        <label className="font-semibold">Password</label>
                        <input type="password" name="password" placeholder={error?"Please fill all the field":"Password"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>
                    </div>
                    </div>
                    <button type="submit" className="flex w-[80px] lg:w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Signup</button>
                    </div>
                    <h1>Don&#39;t have Acount?<Link className="text-blue-600 font-bold" href={"/Login"}>Login</Link></h1>
                </form>
            </div>
            <Toaster position="top-center"
                        reverseOrder={true}/>
        </div>
    )};