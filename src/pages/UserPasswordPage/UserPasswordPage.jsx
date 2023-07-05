import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App/App";
import sendRequest from "../../utilities/send-request";

export default function UserPasswordPage() {
  const { user } = useContext(UserContext);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  // include if have time - show password as text when show button clicked
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);

  function handleClick() {
    //patch password
    setPasswordEdit(true);

    console.log("patch password");
  }

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    console.log(evt.target.elements.currentPassword.value);
    console.log(evt.target.elements.newPassword.value);
    const formData = {
      currentPassword: evt.target.elements.currentPassword.value,
      newPassword: evt.target.elements.newPassword.value,
    };

    try {
      const response = await sendRequest(
        "/api/users/changePassword",
        "PATCH",
        formData
      );
      console.log("success"); // Process the response data as needed
      setPasswordEdit(false);
      setSuccessMessage(true);
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
            <div className="col-span-3 text-left">{user.email}</div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="mb-2 text-left">Password</div>
            <div className="col-span-3 text-left">*********</div>

            {passwordEdit ? (
              <form onSubmit={handleSubmit}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
                  <div className="bg-slate-800 p-6 rounded-lg z-10">
                    <h2 className="text-2xl font-bold mb-4">Change password</h2>

                    <div className=" mb-2">
                      <label>Current password</label>
                      <input
                        name="currentPassword"
                        type="password"
                        className="rounded-md bg text-sky-600 p-2 m-2"
                      ></input>
                    </div>
                    <div className="ml-6">
                      <label>New password</label>
                      <input
                        name="newPassword"
                        type="password"
                        className="rounded-md bg text-sky-600 p-2 m-2 mb-10"
                      ></input>
                    </div>
                    {errMessage && (
                      <div className="mb-10 text-red-800">
                        Password mismatched. Please try again.
                      </div>
                    )}
                    <button
                      onClick={handleCancel}
                      className="w-fit bg-blue-800 font-bold m-2"
                    >
                      Cancel
                    </button>
                    <button className="w-fit bg-green-800 font-bold m-2">
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
          {successMessage && (
            <div className="text-green-800">
              Your password has been updated!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
