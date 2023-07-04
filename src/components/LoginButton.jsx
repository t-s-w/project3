import { UserContext } from "../pages/App/App";
import { useContext, useEffect } from "react";
import LoginForm from './LoginForm'
import './dropdown.css'
import { logout } from "../utilities/users-service"
import { Link, useLocation } from "react-router-dom";

function NotLoggedIn() {
    return <div className="relative w-60" >
        <label htmlFor="dropdown"><span className="cursor-pointer bg-blue-600 hover:bg-blue-400 py-3 px-6 rounded-full">⌾ Log in</span></label>
        <input type="checkbox" id="dropdown" className="hidden" />
        <ul className="border-box px-5 rounded-b-lg slide clear-both w-full h-0 top-10 overflow-hidden transition-[height] absolute bg-blue-800">
            <LoginForm />
        </ul>
    </div>
}


export default function LoginButton() {
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);
    function handleLogout() {
        logout();
        setUser(null);
    }
    useEffect(() => {
        document.getElementById('dropdown').checked = false
    }, [location])
    return user ? (
      <div className="relative w-60">
        <label htmlFor="dropdown">
          <span className="cursor-pointer bg-blue-600 hover:bg-blue-400 py-3 px-6 rounded-full">
            {user.email}
            {/* //* change this to "Welcome back, {user.name}! */}
          </span>
        </label>
        <input type="checkbox" id="dropdown" className="hidden" />
        <div className="flex flex-col [&>a]:py-4 [&>a]:rounded-full border-box px-5 rounded-b-lg slide clear-both w-full h-0 top-10 overflow-hidden transition-[height] absolute bg-blue-800">
          <Link
            to={`/user/profile`}
            className="hover:bg-blue-400 hover:text-inherit"
          >
            My Account
          </Link>
          <Link
            to="/purchasehistory"
            className="hover:bg-blue-400 hover:text-inherit"
          >
            Purchase History
          </Link>
          <Link
            to="/user/password"
            className="hover:bg-blue-400 hover:text-inherit"
          >
            Change password
          </Link>
          <Link
            to=""
            className="hover:bg-red-400 hover:text-inherit"
            onClick={handleLogout}
          >
            Log out
          </Link>
        </div>
      </div>
    ) : (
      <NotLoggedIn />
    );
}