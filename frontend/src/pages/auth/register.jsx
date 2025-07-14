import { useState } from "react"
import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "@/store/auth-slice"
import { toast } from "@/hooks/use-toast"

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword:''
}


export default function Register() {

    const { loading } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function validateForm({ username, password, email, confirmPassword }) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!username || !password || !email) {
            toast({
                title: 'Fields cannot be empty',
                variant: 'destructive',
            });
            return false;
        }

        if(password !== confirmPassword){
            toast({
                title: 'Passwords donot match',
                variant: 'destructive',
            });
            return false;
        }
        if (username.length < 3) {
            toast({
                title: 'Username must be at least 3 characters long',
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

        if (password.length < 6) {
            toast({
                title: 'Password must be at least 6 characters long',
                variant: 'destructive',
            });
            return false;
        }

        if (!alphanumericRegex.test(password)) {
            toast({
                title: 'Password must be alphanumeric',
                variant: 'destructive',
            });
            return false;
        }

        return true;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(formData)) return;

        const {confirmPassword, ...remainingValues }=formData
        try {
            const data = await dispatch(registerUser(remainingValues)).unwrap();
            if (data.success) {
                toast({
                    title: 'Register Successfull',
                    description: data.message
                })
                navigate('/auth/login')
            }
        } catch (error) {
            console.error("Error Registering User:", error);
            toast({
                title: 'Register Failed',
                description: error?.message || 'Error occured during registering of user.',
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="mx-auto w-[85%] mb-6">
            <div className="text-center">
                <h1 className=" text-xl lg:text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account
                    <Link
                        className="font-medium ml-2 text-primary hover:underline text-blue-700"
                        to="/auth/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={loading ? 'Registering...' : 'Sign up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    )

}