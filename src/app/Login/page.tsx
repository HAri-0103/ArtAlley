'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const submit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("username", username);
    form.append("password", password);

    if(!username || !password) {
        toast.error("Please fill all the fields");
        return setError(true);
    }
        try{
            await toast.promise(axios.post("/api/Login",form),{
                loading:"Logging in...",
                success:"Logged in successfully",
                error:"Wrong username or password"
            });
            console.log("Logged in successfully");
            router.push("/");
            setError(false);
        }catch(e){
            console.log(e);
        }
    };


  return (
    <div className={`w-full h-screen flex justify-center items-center text-black`}>
        <div className="w-[90%] h-[80%] bg-white rounded-lg">
            <form onSubmit={submit} className="w-full h-full flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center items-center gap-y-2">
                <div className="text-center">
                <h1 className="text-4xl lg:text-6xl font-bold">ArtAlley</h1>
                <p className="text-sm lg:text-lg text-blue-400">Login to your account</p>
                </div>

                <div>
                <div className="h-10 flex flex-col justify-center items-start w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold">Username</label>
                        <input type="text" name="username" placeholder={error?"Please fill all the field":"UserName"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={username} onChange={e=>setUsername(e.target.value)} />
                </div>

                <div className="flex flex-col justify-center items-start w-full mt-5 lg:w-[400px]">
                        <label className="font-semibold">Password</label>
                        <input type="password" name="password" placeholder={error?"Please fill all the field":"Password"} className={`w-full p-2 border border-gray-300 rounded-md placeholder:tered-500  outline-blue-500" ${error?"placeholder-red-500 border-red-800":" border-gray-300"}`} value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                </div>
                <button type="submit" className="flex w-[80px] lg:w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                </div>
                <h1>Don&#39;t have Acount?<Link className="text-blue-600 font-bold" href={"/Signup"}>Signup</Link></h1>
            </form>
        </div>
        <Toaster position="top-center"
                        reverseOrder={true}/>
    </div>
  );
}