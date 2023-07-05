import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useEffect, useState } from "react"

export default function VerifyReceiptPage() {
    const { id } = useParams()
    const [receipt, setReceipt] = useState();
    const [pageState, setPageState] = useState('idle');
    async function getReceipt() {
        try {
            setPageState('Loading...')
            const receipt = await sendRequest('/api/receipts/' + id)
            setReceipt(receipt)
            setPageState('idle')
        } catch (err) {
            setPageState(err.message)
        }

    }
    useEffect(() => {
        getReceipt()
    }, [])
    return <h1>{pageState}</h1>
}