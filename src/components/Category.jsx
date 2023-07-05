import { Link } from "react-router-dom"

export default function Category (props){
    
    return (
    <div className="underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit">
    <h2><Link 
    to={`/events/categories/categories/${props.categoryName}`}
    state={{categoryArray: props.categoryArray,
            categoryName: props.categoryName
            }}
    >{props.categoryName}</Link></h2>
    </div>
    )
}