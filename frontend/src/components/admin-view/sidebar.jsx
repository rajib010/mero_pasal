import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "../ui/separator";


const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "prouducts",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />
  }
]

function MenuItems({ setOpen }) {
  const navigate = useNavigate()
  return (
    <nav>
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-5 text-muted-foreground hover:bg-muted hover:text-foreground">
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  )
}

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 py-10"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Mero Pasal</h1>
        </div>
          <Separator />
        <MenuItems />
      </aside>  
    </Fragment>
  )
}