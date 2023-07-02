import { useState, useContext } from "react";
import * as usersSvc from '../utilities/users-service'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../pages/App/App";

export default function LoginForm() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState('idle');
    const [successMsg, setSuccessMsg] = useState(null);
    async function handleSubmit(evt) {
        evt.preventDefault();
        const credentials = ({ email: evt.target.email.value, password: evt.target.password.value })
        try {
            setFormState('loading')
            setError(null)
            const user = await usersSvc.login(credentials);
            setSuccessMsg('Sign up successful! Returning you to the home page soon...')
            setUser(user);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setFormState('idle')
            setError(err.message)
        }
    }
    return <div className="loginContainer">
        <form onSubmit={handleSubmit}>
            <fieldset disabled={formState === "loading"} className="flex flex-col place-items-center place-content-center [&>*]:m-1">
                <input className="p-2 pl-4 border-solid border-2 rounded-full" type="email" name="email" placeholder="E-mail" required />
                <input className="p-2 pl-4 border-solid border-2 rounded-full" type="password" name="password" placeholder="Password" required />
                <button className="w-fit bg-slate-300 font-bold disabled:bg-slate-200 disabled:text-slate-700">Log in</button>
                {error && <p className="text-red-700">{error}</p>}
                {successMsg && <p className="text-green-700">{successMsg}</p>}
            </fieldset>
        </form>
    </div>
}