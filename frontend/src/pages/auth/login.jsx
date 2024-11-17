import { loginFormControls } from "@/config"
import CommonForm from "@/components/common/form"
import { useState } from "react"
import { Link } from "react-router-dom"

const initialState = {
    email: '',
    password: ''
}
export default function Login() {
    const [formData, setformData] = useState(initialState)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    function handleSubmit() {

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
                buttonText={"Login"}
                isBtnDisabled={isBtnDisabled}
            />
        </div>
    )
}