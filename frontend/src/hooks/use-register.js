import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const useRegister = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const register = async ({ username, email, password }) => {
        const success = handleInputErrors({ username, email, password, toast }); 
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("auth-user", JSON.stringify(data));
            toast({
                title: "Signup Successful",
                description: "You have been registered successfully!",
            }); 
        } catch (error) {
            toast({
                title: "Error during signup",
                description: error.message,
            });
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
        });
        return false;
    }

    if (username.length < 3) {
        toast({
            title: "Invalid username.",
            description: "Username should be at least 3 characters.",
        });
        return false;
    }
    if (password.length < 5) {
        toast({
            title: "Password weak.",
            description: "Password should be at least 5 characters.",
        });
        return false;
    }

    return true;
}

export default useRegister;
