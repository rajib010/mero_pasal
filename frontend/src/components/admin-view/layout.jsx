import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

export default function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false)
    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}




