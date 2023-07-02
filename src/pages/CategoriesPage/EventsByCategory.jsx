import { useLocation } from "react-router";

export default function EventsByCategory(){
    const location = useLocation();
    const {categoryArray} = location.state;
    console.log(categoryArray);
    return (
    <>
    {JSON.stringify(categoryArray)}
    </>
    )
}