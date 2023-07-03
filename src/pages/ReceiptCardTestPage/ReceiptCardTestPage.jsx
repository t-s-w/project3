import { useEffect, useState } from "react"
import PurchaseCard from '../../components/PurchaseCard'

export default function ReceiptCardTestPage() {
    const [receipt, setReceipt] = useState(null)
    const id = "649fb119535fa169828ebb8d"
    useEffect(() => {
        async function getReceipt(id) {
            const fetchedReceipt = await fetch(`/api/receipts/${id}`).then(x => x.json())
            setReceipt(fetchedReceipt);
        }
        getReceipt(id)
    }, [])
    return receipt ? <PurchaseCard receipt={receipt} /> : undefined
}