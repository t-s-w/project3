import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App/App";

export default function UserPasswordPage() {
  const { user } = useContext(UserContext);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [save, setSave] = useState(false);

  function handleClick() {
    //patch password
    setPasswordEdit(true);
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
        <div className="[&>*]:m-2 [&>input]:disabled:text-slate-200 border-solid flex flex-col place-content-center place-items-left w-1/2 p-10">
          <div className="grid grid-cols-4 gap-5">
            <div className="mb-2 text-left">Email</div>

            <div />
            {user.email}
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="mb-2 text-left">Password</div> <div />
            *********
            {passwordEdit ? (
              <button
                className="w-fit bg-blue-800 font-bold"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="w-fit bg-blue-800 font-bold"
                onClick={handleClick}
              >
                Change
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
