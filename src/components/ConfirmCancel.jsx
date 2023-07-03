import PurchaseCard from './PurchaseCard'

export default function ConfirmCancel(props) {
    const {receipt, setCancelBooking} = props;
    function handleDelete() {
        return
    }
    return <div className="bg-[rgba(50,50,50,0.9)] text-darkDefault [&>a]:p-4 [&>*]:my-3 [&>a]:rounded-md fixed top-0 left-0 flex flex-col place-items-center justify-center w-full min-h-full">
        <h1 className="font-bold">Are you sure?</h1>
        <p>Refunds may take up to 1 week.</p>
        <PurchaseCard receipt={receipt} />
        <button className="bg-blue-800 hover:bg-blue-400 hover:text-inherit" onClick={() => setCancelBooking(null)}>Never mind</button>
        <button className="bg-stone-800 hover:bg-red-950 hover:text-inherit" onClick={() => handleDelete(receipt._id)}>Yes, please cancel this booking</button>
    </div>
}