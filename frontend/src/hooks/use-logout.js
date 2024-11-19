import { useState } from "react"
import { useToast } from "./use-toast"
import axios from "axios"
import { useDispatch } from "react-redux"
import { logout } from "@/store/auth-slice"

const useLogout = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const logoutUser = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/user/logout",
                {}, {
                headers: { "Content-Type": "application/json" }
            });
            const data = res.data
            if (data.error) {
                throw new Error(data.error);
            }
            dispatch(logout())
            toast({
                title: 'Logout Successfull',
                description: data?.message || "User logged out successfully"
            })
            return true
        } catch (error) {
            toast({
                title: 'Failed Logout',
                description: error.response?.data?.message || error.message || 'An unexpected error occured during logout',
                variant: 'destructive'
            })
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, logoutUser }
}

export default useLogout