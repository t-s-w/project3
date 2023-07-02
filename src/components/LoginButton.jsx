import { UserContext } from "../pages/App/App";
import { useContext } from "react";
import LoginForm from './LoginForm'
import './dropdown.css'

function NotLoggedIn() {
    return <div className="relative w-60" >
        <label htmlFor="dropdown"><span className="cursor-pointer">⌾ Log in</span></label>
        <input type="checkbox" id="dropdown" className="hidden" />
        <ul className="border-box px-5 rounded-b-lg slide clear-both width-full h-0 overflow-hidden transition-[height] absolute bg-blue-800">
            <LoginForm />
        </ul>
    </div>
}

export default function LoginButton() {
    const { user } = useContext(UserContext);

    return user ? `Signed in as ${user.email}` : <NotLoggedIn />
}