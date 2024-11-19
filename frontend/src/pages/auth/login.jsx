import { loginFormControls } from "@/config"
import CommonForm from "@/components/common/form"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "@/store/auth-slice"
import { toast } from "@/hooks/use-toast"

const initialState = {
    email: '',
    password: ''
}
export default function Login() {
    const [formData, setformData] = useState(initialState)
    const { loading } = useSelector((state) => state.auth)
    function validateForm({ email , password}) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if ( !password || !email) {
            toast({
                title: 'Fields cannot be empty',
                variant: 'destructive',
            });
            return false;
        }

        if (!emailRegex.test(email)) {
            toast({
                title: 'Invalid email format',
                variant: 'destructive',
            });
            return false;
        }   

        return true;
    }


    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await dispatch(loginUser(formData)).unwrap();

            if (data.success) {
                toast({
                    title: 'Login Successful',
                    description: data.message,
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast({
                title: 'Login Failed',
                description: error?.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
        }
    };


    return (
        <div className="mx-auto w-[85%] mb-6">
            <div>
                <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-foreground">
                    Don't have an account?
                </h1>
                <p className="mt-2">
                    Create a new one today
                    <Link
                        className="font-medium ml-2 text-primary hover:underline text-blue-700"
                        to="/auth/register"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setformData}
                onSubmit={handleSubmit}
                buttonText={loading ? 'Logging in' : 'Login'}
                isBtnDisabled={loading}
            />
        </div>
    )
}