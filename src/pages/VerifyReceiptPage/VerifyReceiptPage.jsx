import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useEffect, useState } from "react"

export default function VerifyReceiptPage() {
    const { id } = useParams()
    const [receipt, setReceipt] = useState();
    const [pageState, setPageState] = useState('Loading...');
    async function getReceipt() {
        try {
            setPageState('Loading...')
            const receipt = await sendRequest('/api/receipts/' + id)
            setReceipt(receipt)
            setPageState('idle')
        } catch (err) {
            setPageState("Error: invalid receipt")
        }

    }
    useEffect(() => {
        getReceipt()
    }, [])

    return pageState === "idle" ? <div className="text-left mb-auto mt-10 flex flex-col justify-start">
        <h1 className="mb-4">Verify Receipt</h1>
        <p><span className="font-bold">Name:</span> {receipt.deliveryName}</p>
        <p><span className="font-bold">Seat(s):</span> {receipt.row + (receipt.startSeat < 10 ? '0' + receipt.startSeat : receipt.startSeat)}{(receipt.endSeat !== receipt.startSeat) && '-' + (receipt.row + (receipt.endSeat < 10 ? '0' + receipt.endSeat : receipt.endSeat))}</p>
        <p><span className="font-bold">Purchased on: </span>{(new Date(receipt.createdAt)).toLocaleTimeString('en-sg', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
        <p><span className="font-bold">Amount paid: </span> ${receipt.amountPaid}</p>
    </div>
        : <h1>{pageState}</h1>
}