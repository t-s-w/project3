import { Link } from "react-router-dom"
import './category.css'
const images = {
    Music: "/music.jpg",
    "Arts & Theatre": "/arts.jpg",
    Miscellaneous: "/misc.jpg",
    Sports: "/sports.jpg"
}



export default function Category(props) {

    return (
        <Link
            className="categoryContainer w-1/2 h-60 flex flex-col justify-center items-center bg-center bg-cover text-center"
            to={`/events/categories/categories/${props.categoryName}`}
            style={{ "--bg-img": `url(${images[props.categoryName]})` }}
            state={{
                categoryArray: props.categoryArray,
                categoryName: props.categoryName
            }}
        ><p className="font-bold text-darkDefault text-2xl">
                {props.categoryName}
            </p>
        </Link>
    )
}