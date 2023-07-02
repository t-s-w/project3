import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function EventsByCategory(){
    const location = useLocation();
    const {categoryArray, categoryName} = location.state;
    console.log(categoryArray)
    return (
    <>
    
    <h1>{categoryName}</h1>
    <div className="flex flex-wrap">
    {categoryArray.map(category => ( 
        <div className="w-1/3 p-3">
            <img className="w-full h-40 object-cover" src={category.images[0].url} />
            <Link to={`/events/${category?._id}`}>{category?.name}</Link>
            
        </div>
    ))}
    </div>
    </>
    )
}