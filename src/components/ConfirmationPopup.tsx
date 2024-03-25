import { Button } from "@mui/material"

export default function ConfirmationPopup({msg, confirm, cancel} : {msg:string, confirm:() => void, cancel:() => void}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="bg-slate-200 rounded-lg p-8 z-[9999]">
                <p className="text-lg mb-4">{msg}</p>
                <div className="flex justify-between">
                    <Button variant="contained" className="bg-red-500 hover:bg-red-700" onClick={confirm}>
                        Yes
                    </Button>
                    <Button variant="contained" className="bg-gray-500" onClick={cancel}>
                        No
                    </Button>
                </div>
            </div>
        </div>
    )
}