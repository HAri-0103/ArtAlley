import Link from "next/link";

interface PostCardProps {
    props:{
        _id:string,
        avt:string,
        name:string,
        caption:string,
        img:string,
        tag:string,
        likes:number,
        saved:number,
        username:string,
    }
}


export default function SearchPost( { props }: PostCardProps) {
    return (
        <div className="py-5 flex w-full text-white px-5">
            <div className="grid grid-flow-row grid-cols-1  lg:grid-cols-2 gap-10">
            <Link href={`/@${props.username}`} key={props._id} className="bg-dark-3 rounded-lg p-2">
                        <img src={props.img} alt="post" className="w-[550px] h-[400px] object-cover rounded-lg" />
                        <div className="flex justify-between items-center mt-2">
                        </div>
                    </Link>
            </div>
        </div>
    )
}