import Link from "next/link";


export default function TopMenuItem( datas:{title:string,pageRef:string}){

    return(
        <Link href={datas.pageRef} className="w-fit pt-2 pb-2 pl-3 pr-3 font-semibold text-lg ml-auto mt-auto mb-auto border-l-2 border-r-2 border-slate-300">
            {datas.title}
        </Link>
    )
}