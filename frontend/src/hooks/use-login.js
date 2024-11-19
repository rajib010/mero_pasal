import { useState } from "react";
import axios from "axios";
import { useToast } from "./use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth-slice";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch()

    const login = async ({ email, password }) => {
        const success = handleInputErrors({ email, password, toast });
        if (!success) return false;

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/user/login",
                {
                    email,
                    password
                }, {
                headers: { "Content-Type": "application/json" }
            });

            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }
            dispatch(setUser(data.user))
            
            toast({
                title: "Login successful",
                description: data.message,
            });
            return true;
        } catch (error) {
            toast({
                title: "Login Error",
                description: error.response?.data?.message || error.message || "An unexpected error occurred.",
                variant: "destructive",
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

function handleInputErrors({ email, password, toast }) {
    if (!email || !password) {
        toast({
            title: "Empty fields",
            description: "Fields cannot be empty.",
            variant: "destructive",
        });
        return false;
    }

    return true;
}

export default useLogin;
