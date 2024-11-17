import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col max-h-screen justify-center items-center gap-5 w-[70vw] md:w-[40vw] lg:w-[32vw] mx-auto shadow-2xl rounded-md">
                <div className="flex bg-slate-800 py-5 px-10 rounded-lg text-white w-full">
                    <h1 className="font-bold text-center w-full text-xl lg:text-3xl">Welcome to Mero_Pasal</h1>
                </div>
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
