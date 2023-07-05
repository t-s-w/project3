import { Link } from "react-router-dom"

export default function Category (props){
    
    return (
    <div>
        
        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <h2><Link 
            to={`/events/categories/categories/${props.categoryName}`}
            state={{categoryArray: props.categoryArray,
            categoryName: props.categoryName
            }}
            >{props.categoryName}</Link></h2>
        </div>
    </div>
    )
}