import { useParams } from "react-router-dom";
export default function EventDetailsPage(){

    const {id} = useParams();
    
    return (
    <>
    <p>{id}</p>
    <button className="rounded-full m-5 bg-blue-500" >Purchase</button>
    </>
    )
}