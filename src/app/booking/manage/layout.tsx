export default function ManageBookingLayout(
    {children, dashboard} : {children:React.ReactNode, dashboard:React.ReactNode}) {
    return (
        <div className="flex flex-col w-full">
            { children }
            { dashboard }
        </div>
    )
}