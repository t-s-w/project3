import { useNavigate } from "react-router-dom";

export default function UserDetailPage() {
  // const [confirmButton, setConfirmButton] = useState(false);

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    const formData = {
      name: evt.target.name.value,
      contactNo: evt.target.contactNo.value,
      address: evt.target.address.value,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/userDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      console.log(jsonData); // Process the response data as needed
      setConfirmButton(false);
    } catch (error) {
      console.error(error);
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
            <label className="mb-2 text-left"> Name </label>
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left"> Contact number </label>{" "}
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              minLength="8"
              name="contactNo"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="mb-2 text-left"> Mailing address </label>
            <input
              className="p-2 pl-4 border-solid border-2 rounded-full"
              type="text"
              name="address"
            />
          </div>
          <button className="w-fit bg-blue-800 font-bold">Confirm</button>
        </div>
      </form>
    </>
  );
}
