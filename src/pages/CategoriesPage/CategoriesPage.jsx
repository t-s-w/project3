import { useEffect, useState } from "react";
import Category from "../../components/Category";

export default function Categories () {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        async function fetchAllCategories() {
            const response = await fetch("/api/events/categories/categories");
            const jsonData = await response.json();
            setCategories(jsonData);

        }
        fetchAllCategories();
        console.log(categories);
    }, []);
    
    return (
    <>
    {Object.keys(categories).map(category => 
        
        <h2><Category categoryName={category} categoryArray={categories[category]}/></h2>
        
        )}
    </>
    )
}