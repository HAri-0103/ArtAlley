import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";
import PostForm from "@/components/forms/PostForm";

export default function CreatePost() {
    return (
        <div className="md:absolute md:left-0 flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start">
                    <MdOutlineAddPhotoAlternate
                    size={36} />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
                </div>

                <PostForm action="Create"/>
            </div>
        </div>
    )
}