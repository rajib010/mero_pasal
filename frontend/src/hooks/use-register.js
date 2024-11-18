import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";

const useRegister = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const register = async ({ username, email, password }) => {
        const success = handleInputErrors({ username, email, password, toast });
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/user/register", {
                username,
                email,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            });
            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }
            toast({
                title: "Signup Successful",
                description: "You have been registered successfully!",
            });
            return true;
        } catch (error) {
            toast({
                title: "Error during signup",
                description: error.message,
                variant: 'destructive'
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

function handleInputErrors({ username, email, password, toast }) {
    if (!username || !email || !password) {
        toast({
            title: "Incomplete details.",
            description: "The fields cannot be left empty.",
            variant: 'destructive'

        });
        return false;
    }

    if (username.length < 3) {
        toast({
            title: "Invalid username.",
            description: "Username should be at least 3 characters.",
            variant: 'destructive'

        });
        return false;
    }
    if (password.length < 5) {
        toast({
            title: "Password weak.",
            description: "Password should be at least 5 characters.",
            variant: 'destructive'

        });
        return false;
    }

    return true;
}

export default useRegister;
