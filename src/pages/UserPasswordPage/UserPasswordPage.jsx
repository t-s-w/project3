import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App/App";

export default function UserPasswordPage() {
  const { user } = useContext(UserContext);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  function handleClick() {
    //patch password
    setPasswordEdit(true);
    setSave(true);
    console.log("patch password");
  }

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    console.log(evt.target.elements.currentPassword.value);
    console.log(evt.target.elements.newPassword.value);
    console.log("submit");
    const formData = {
      currentPassword: evt.target.elements.currentPassword.value,
      newPassword: evt.target.elements.newPassword.value,
    };

    try {
      const response = await sendRequest("/api/user", "PATCH", formData);
      console.log("success"); // Process the response data as needed
      // setConfirmButton(false);
    } catch (error) {
      console.log("mismatched");
      setErrMessage(true);
      // Handle any errors that occur during the request
    }
  };

  function handleCancel() {
    setPasswordEdit(false);
  }

  return (
    <div>
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
              <form onSubmit={handleSubmit}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
                  <div className="bg-black p-6 rounded-lg z-10">
                    <h2 className="text-2xl font-bold mb-4">Change password</h2>

                    <div className="bg white mb-4">
                      <label>Current password </label>
                      <input
                        name="currentPassword"
                        className="rounded-md bg text-sky-600 p-2"
                      ></input>
                      <label>New password </label>
                      <input
                        name="newPassword"
                        className="rounded-md bg text-sky-600 p-2"
                      ></input>
                    </div>
                    {errMessage && (
                      <div className="text-red-800">
                        Password mismatched. Please try again.
                      </div>
                    )}
                    <button
                      onClick={handleCancel}
                      className="w-fit bg-blue-800 font-bold"
                    >
                      Cancel
                    </button>
                    <button className="w-fit bg-blue-800 font-bold">
                      Save
                    </button>
                  </div>
                </div>
              </form>
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
    </div>
  );
}

