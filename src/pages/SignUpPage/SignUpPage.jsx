import { useState } from 'react';

export default function SignUpPage() {
    const [formState, setFormState] = useState('idle');

    const handleSubmit = function (evt) {
        evt.preventDefault()
        console.log(evt.target)
    }

    return <>
        <h1>Sign Up</h1>
        <form className="m-8 flex place-content-center" onSubmit={handleSubmit}>
            <fieldset className="border-solid border-2 flex flex-col place-content-center place-items-center w-1/3 rounded-xl p-10">
                <input className="p-2 pl-4 m-2 border-solid border-2 rounded-full" type="email" name="email" placeholder="Email" />
                <input className="p-2 pl-4 m-2 border-solid border-2 rounded-full" type="password" name="password" placeholder="Password..." />
                <input className="p-2 pl-4 m-2 border-solid border-2 rounded-full" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <button className="w-fit bg-slate-300 font-bold">Sign Up!</button>
            </fieldset>
        </form>
    </>
}