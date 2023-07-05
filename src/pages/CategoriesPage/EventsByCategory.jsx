import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function EventsByCategory(){
    const location = useLocation();
    const {categoryArray, categoryName} = location.state;
    console.log(categoryArray)
    return (
    <>
    
    <h1 className="text-left text-1xl my-2 mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{categoryName}</h1>
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