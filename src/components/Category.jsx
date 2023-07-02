import { Link } from "react-router-dom"

export default function Category (props){
    
    return (
    <div>
    <h2><Link 
    to={`/events/categories/categories/${props.categoryName}`}
    state={{categoryArray: props.categoryArray,
            categoryName: props.categoryName
            }}
    >{props.categoryName}</Link></h2>
    </div>
    )
}