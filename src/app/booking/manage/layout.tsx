export default function ManageBookingLayout(
    {children, dashboard, manage} : {children:React.ReactNode, dashboard:React.ReactNode, manage:React.ReactNode}) {
    return (
        <div className="flex flex-col w-full bg-slate-100">
            { children }
            { dashboard }
            { manage }
        </div>
    )
}