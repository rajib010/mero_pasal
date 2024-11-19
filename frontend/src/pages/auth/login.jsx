import { loginFormControls } from "@/config"
import CommonForm from "@/components/common/form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useLogin from "@/hooks/use-login"

const initialState = {
    email: '',
    password: ''
}
export default function Login() {
    const [formData, setformData] = useState(initialState)
    const navigate = useNavigate()
    const { loading, login } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await login(formData)
        if (success) {
            navigate('/shop/home')
        }
    }
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