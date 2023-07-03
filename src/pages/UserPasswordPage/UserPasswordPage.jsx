import { useNavigate } from "react-router-dom";
import userDetails from "../../../controllers/userDetails";
import { useState } from "react";

export default function UserPasswordPage(props) {
  const { setUser } = props;
  const [passwordEditable, setPasswordEditable] = useState(false);

  function handleClick() {
    //patch password
    setPasswordEditable(true);
    console.log("patch password");
  }
  return (
    <>
      <div className="flex flex-col items-center justify h-screen">
        <h1 className="font-bold whitespace-nowrap">Your login details</h1>
        <fieldset className="[&>*]:m-2 [&>input]:disabled:text-slate-200 border-solid border-2 flex flex-col place-content-center place-items-center w-1/3 rounded-xl p-8">
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left">Email</label>
            <input
              disabled
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="email"
              placeholder="{user.email}"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left">Password</label>{" "}
            <input
              disabled={!passwordEditable}
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              minLength="8"
              name="password"
              placeholder="{user.password} ******"
            />
          </div>
          <button
            onClick={handleClick}
            className="w-fit bg-slate-300 font-bold disabled:bg-slate-200 disabled:text-slate-700"
          >
            Change
          </button>
        </fieldset>
      </div>
    </>
  );
}
