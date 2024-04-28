'use client'
import { use, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import { FaA, FaArrowLeft } from 'react-icons/fa6';
import { LuSendHorizonal } from "react-icons/lu";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const socket = io('http://localhost:5000');

export default function Message() {
    const search = useSearchParams();
    const [message, setMessage] = useState('');
    const [dbMessage, setDbMessage] = useState([
        {
            senderId: '',
            receiverId: '',
            message: ''
        }
    ]);
    const [chat, setChat] = useState(''); 
    const [user, setUser] = useState(
        {
            _id: '',
            name: '',
            avt:"",
            username: '',
        }
    );
    const [reci, setReci] = useState({
        _id: '',
        name: '',
        avt:"",
        username: '',
    });
    useEffect(() => {
        const num = search.get('id');
        const func = async () => {
            const res = await axios.get(`/api/User/receiver?id=${num}`);
            const resmessage = await axios.get(`/api/User/Message?id=${num}`);
            const user = await axios.get('/api/User');
            setUser(user.data.data);
            setReci(res.data.data);
            setDbMessage(resmessage.data.data);
        }
        func();
        socket.on('chat', (message) => {
            for (let i = 0; i < dbMessage.length; i++) {
                if (dbMessage[i].senderId === user._id && dbMessage[i].receiverId === reci._id) {
                    setChat(message);
                    let html = document.getElementById('sender');
                    if (html) {
                        html.innerHTML += `<div class='w-full flex justify-start'>
                        <h1 class='max-w-[600px] min-w-10 bg-blue-400 text-white p-2 rounded-lg'>${chat}</h1>
                    </div>`
                    }
                }
            }
        });
    }, [])
        const data = {
        message,
        receiverId: reci._id,
        senderId: user._id
    }
    
    const send =async () => {
        const res = await axios.post('/api/User/Message', data);
        const message = res.data.data.message;
        socket.emit('chat', data.message);
        let html = document.getElementById('sender');
                    if (html) {
                        html.innerHTML += `<div class='w-full flex justify-end'>
                        <h1 class='max-w-[600px] min-w-10 bg-blue-400 text-white p-2 rounded-lg'>${message}</h1>
                    </div>`
                    }
        setMessage('');

    }
    return(
        <div className='w-full md:absolute md:left-2 md:w-[calc(100vw-300px)] h-full'>
            <nav className='fixed w-full md:w-[calc(100vw-300px)] h-20 bg-dark-3 flex justify-start items-center gap-5 z-10'>
                <FaArrowLeft className='text-white text-2xl ml-4'/>
                <Image src={reci.avt} alt="" width={50} height={50} className='rounded-full'/>
                <h1 className='font-bold text-2xl'>{reci.username}</h1>
            </nav>
            <div className='absolute w-full top-[80px] h-[80vh] md:h-[90vh] pb-[150px] md:pb-[100px] bg-green-400 flex px-5 flex-col justify-start pt-3 items-start gap-5 overflow-y-auto' id='sender'>
            </div>
            <div className='fixed bottom-24 md:bottom-0 w-[100%] md:w-[calc(100vw-340px)] h-20 flex justify-between items-center gap-5 px-3 z-10 md:my-5'>
                <input type='text' placeholder='Type a message...' value={message} className='w-[600px] md:w-full h-full bg-dark-3 text-white p-2 rounded-lg' onChange={e=>setMessage(e.target.value)}/>
                <LuSendHorizonal size={30}  className='cursor-pointer text-white bg-blue-400 w-[80px] h-[70%] rounded-lg' onClick={send}/>
            </div>
        </div>
    )
}