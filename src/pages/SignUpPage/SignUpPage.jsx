import { useState } from 'react';
import * as usersSvc from '../../utilities/users-service.js'
import UserModal from "../../components/UserModal";

import Debug from "debug";
import { useNavigate } from "react-router-dom";

const debug = Debug("signuppage");

export default function SignUpPage(props) {
  const { setUser } = props;
  const [formState, setFormState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    if (evt.target.password.value !== evt.target.confirmPassword.value) {
      setErrorMsg("Passwords do not match");
    }
    try {
      setFormState("loading");
      const formData = {
        email: evt.target.email.value,
        password: evt.target.password.value,
      };
      const user = await usersSvc.signUp(formData);
      setSuccessMsg(
        "Sign up successful! Returning you to the home page soon..."
      );
      setUser(user);
      setShowModal(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <form className="m-8 flex place-content-center" onSubmit={handleSubmit}>
        <fieldset
          className="[&>*]:m-2 [&>input]:disabled:text-slate-200 border-solid border-2 flex flex-col place-content-center place-items-center w-1/3 rounded-xl p-8"
          disabled={formState === "loading"}
        >
          <h1 className="font-extrabold">Sign Up</h1>
          <input
            className="p-2 pl-4 border-solid border-2 rounded-full"
            required
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="p-2 pl-4 border-solid border-2 rounded-full"
            type="password"
            minLength="8"
            name="password"
            placeholder="Password..."
          />
          <input
            className="p-2 pl-4 border-solid border-2 rounded-full"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <button className="w-fit bg-slate-300 font-bold disabled:bg-slate-200 disabled:text-slate-700">
            Go!
          </button>
          {errorMsg && <p className="text-red-700">{errorMsg}</p>}
          {successMsg && <p className="text-green-700">{successMsg}</p>}
        </fieldset>
        {showModal && <UserModal />}
      </form>
    </>
  );
}