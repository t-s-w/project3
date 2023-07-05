import { useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";

export default function UserDetailPage() {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [success, setSuccess] = useState(false);
  const [isModified, setIsModified] = useState(false);

  console.log(details);

  async function getOneUserDetail() {
    const response = await sendRequest(`/api/userDetails/getOneUser`);
    setDetails(response);
  }

  useEffect(() => {
    getOneUserDetail().then(console.log);
  }, [success]);

  console.log(details);

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    const formData = {
      name: evt.target.name.value,
      contactNo: evt.target.contactNo.value,
      address: evt.target.address.value,
    };

    try {
      const response = await sendRequest("/api/userDetails", "PATCH", formData);
      console.log(response); // Process the response data as needed
      setSuccess(true);
      setIsModified(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleInputChange = () => {
    setIsModified(true);
    setSuccess(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-left justify h-screen"
      >
        <h1 className="text-2xl text-left m-5">
          <b>Your details</b>
        </h1>
        <div className="[&>*]:m-2 [&>input]:disabled:text-slate-200 border-solid flex flex-col place-content-center place-items-left w-1/2 p-10">
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left" value={details.name}>
              {" "}
              Name{" "}
            </label>
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="name"
              placeholder={details.name}
              onChange={handleInputChange} // Add onChange event handler to track input changes
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left"> Contact number </label>{" "}
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              minLength="8"
              name="contactNo"
              placeholder={details.contactNo}
              onChange={handleInputChange} // Add onChange event handler to track input changes
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left"> Mailing address </label>
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="address"
              placeholder={details.address}
              onChange={handleInputChange} // Add onChange event handler to track input changes
            />
          </div>
          <button
            className={`w-fit bg-blue-800 font-bold ${
              !isModified ? "bg-slate-400" : ""
            }`}
            disabled={!isModified}
          >
            Confirm
          </button>
          {success && (
            <div className="text-green-800">
              Your profile has been successfully updated.
            </div>
          )}
        </div>
      </form>
    </>
  );
}
