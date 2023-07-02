import { useEffect, useState } from "react";

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
    {JSON.stringify(categories)}
    </>
    )
}