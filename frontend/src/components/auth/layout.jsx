import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <div className="flex flex-col gap-5 max-h-screen width-[60vw] max-w-[75vw] mx-auto overflow-hidden shadow-2xl rounded-md">
           <div className="flex items-center justify-center bg-slate-800 py-5 px-10  text-white w-full">
                <h1 className="font-bold text-xl lg:text-3xl">Welcome to Mero_Pasal</h1>
           </div>
            <Outlet/>
        </div>
    )
}