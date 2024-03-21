import Link from "next/link";


export default function TopMenuItem( datas:{title:string,pageRef:string}){

    return(
        <Link href={datas.pageRef} className="w-fit p-2 pl-3 pr-3 font-semibold text-xl ml-auto mt-auto mb-auto rounded-2xl hover:bg-slate-700">
            {datas.title}
        </Link>
    )
}