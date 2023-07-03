import { useNavigate } from "react-router-dom";

import { useState, useContext } from "react";
import { UserContext } from "../App/App";
// import User from "../../../models/User";

export default function UserPasswordPage(props) {
  const { user } = useContext(UserContext);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [save, setSave] = useState(false);

  function handleClick() {
    //patch password
    setPasswordEditable(true);
    setSave(true);
    console.log("patch password");
  }
  function handleSave() {
    console.log("save to db");
    //navigate back
  }
  return (
    <>
      <div className="flex flex-col items-left justify h-screen">
        <h1 className="text-2xl text-left m-5">
          {" "}
          <b>Your login details</b>
        </h1>
        <fieldset className="[&>*]:m-2 [&>input]:disabled:text-slate-200 border-solid flex flex-col place-content-center place-items-left w-1/2 p-10">
          <div className="grid grid-cols-4 gap-5">
            <label className="mb-2 text-left">Email</label>
            <input
              disabled
              className="p-2 pl-4 col-span-2 border-solid border-2 rounded-full"
              type="text"
              name="email"
              placeholder={user.email}
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            <label className="mb-2 text-left">Password</label>{" "}
            <input
              disabled={!passwordEditable}
              className="p-2 pl-4 col-span-2 border-solid border-2 rounded-full"
              type="text"
              minLength="8"
              name="password"
              placeholder="********"
            />
            <button
              onClick={save ? handleSave : handleClick}
              className="w-fit bg-blue-800 font-bold"
            >
              {" "}
              {save ? "Save" : "Change"}
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
}
