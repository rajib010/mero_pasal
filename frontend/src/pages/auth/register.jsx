import { useState } from "react"
import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { Link, useNavigate } from "react-router-dom"
import useRegister from "@/hooks/use-register"

const initialState = {
    username: '',
    email: '',
    password: ''
}

export default function Register() {

    const { loading, register } = useRegister()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData)
        if (success) {
            navigate('/auth/login')
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