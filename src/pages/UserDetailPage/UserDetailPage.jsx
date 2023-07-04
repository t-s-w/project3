import { useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";

export default function UserDetailPage() {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  console.log(details);

  async function getOneUserDetail() {
    const response = await sendRequest(`/api/userDetails/getOneUser`);
    setDetails(response);
  }

  useEffect(() => {
    getOneUserDetail().then(console.log);
  }, []);

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
      // setConfirmButton(false);
    } catch (error) {
      // Handle any errors that occur during the request
    }
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
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left"> Mailing address </label>
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="address"
              placeholder={details.address}
            />
          </div>
          <button className="w-fit bg-blue-800 font-bold">Confirm</button>
        </div>
      </form>
    </>
  );
}
