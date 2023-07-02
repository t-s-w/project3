import { Link } from "react-router-dom"

export default function Category (props){
    console.log(props.categoryArray)
    return (
    <div>
    <h2><Link 
    to={`/events/categories/categories/${props.categoryName}`}
    state={{categoryArray: props.categoryArray}}
    >{props.categoryName}</Link></h2>
    </div>
    )
}