'use client'
import Image from "next/image";
import { use, useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { TfiGallery } from "react-icons/tfi";
import { Button } from "./button";
import { useEdgeStore } from "@/lib/edgestore";

type FileUploaderProps = {
    fieldChange: (string:String) => void;
    mediaUrl: string;
}

export default function FileUploader({fieldChange, mediaUrl }:FileUploaderProps) {
    const {edgestore} = useEdgeStore();
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    useEffect(() => { setFileUrl(mediaUrl),fieldChange(mediaUrl)}, [mediaUrl] )
      const onDrop = useCallback((acceptedFiles:FileWithPath[]) =>{
        setFiles(acceptedFiles);
        async function set(){
            const res = await edgestore.postImage.upload({
                file: acceptedFiles[0],
            });
            fieldChange(res.url);
        }
        set();
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        },[files,edgestore]);
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{
            'image/*':['.png','.jpeg','.jpg','.svg']
        }
    });

    return (
        <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl md:w-[60vw] cursor-pointer">
            <input {...getInputProps()} className="cursor-poinnter"/>
            {
                fileUrl ? (
                    <div>
                        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                            <Image src={fileUrl} alt="image" width={200} height={200} className="file_uploader-img" />
                        </div>
                        <p className="file_uploader-label">Click or Drag photo to replace</p>
                    </div>
                ) : (
                    <div className="file_uploader-box">
                        <TfiGallery size={50} />
                        <h1 className="base-medium text-light mb-2 mt-6">Drag & Drop your files here</h1>
                        <h1 className="text-light-4 small-regular mb-6">SVG, PNG, JPEG</h1>
                        <Button className="shd-button_dark_4">Browse Files</Button>
                    </div>
                )
            }
        </div>
    )
}