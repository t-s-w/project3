import { useState } from 'react';
import { signUp } from '../../utilities/users-service.js'

export default function SignUpPage() {
    const [formState, setFormState] = useState('idle');
    const [errorMsg, setErrorMsg] = useState(null);
    const handleSubmit = function (evt) {
        evt.preventDefault()
        if (evt.target.password.value !== evt.target.confirmPassword.value) {
            setErrorMsg('Passwords do not match')
        }
        try {
            const formData = ({ email: this.target.email.value, password: this.target.password.value })
            const user = await usersAPI.signUp(userData);
        } catch {
            setErrorMsg("Signup failed - try again.")
        }
    }

    return <>

        <form className="m-8 flex place-content-center" onSubmit={handleSubmit}>
            <fieldset className="[&>*]:m-2 border-solid border-2 flex flex-col place-content-center place-items-center w-1/3 rounded-xl p-8">
                <h1 className="font-extrabold">Sign Up</h1>
                <input className="p-2 pl-4 border-solid border-2 rounded-full" required type="email" name="email" placeholder="Email" />
                <input className="p-2 pl-4 border-solid border-2 rounded-full" type="password" minLength="8" name="password" placeholder="Password..." />
                <input className="p-2 pl-4 border-solid border-2 rounded-full" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <button className="w-fit bg-slate-300 font-bold" >Go!</button>
                {errorMsg && <p className="text-red-700">{errorMsg}</p>}
            </fieldset>
        </form>
    </>
}