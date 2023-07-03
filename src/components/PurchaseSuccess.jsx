import PurchaseCard from './PurchaseCard'
import { Link } from 'react-router-dom';

export default function PurchaseSuccess(props) {
    const {receipt} = props;
    return <div className="bg-[rgba(50,50,50,0.9)] text-darkDefault [&>a]:p-4 [&>*]:my-3 [&>a]:rounded-md fixed top-0 left-0 flex flex-col place-items-center justify-center w-full min-h-full">
        <h1 className="font-bold">Purchase Success!</h1>
        <PurchaseCard receipt={receipt} />
        <Link to="/purchasehistory" className="bg-blue-800 hover:bg-blue-400 hover:text-inherit">Check your purchase history</Link>
        <Link to="/events" className="bg-blue-800 hover:bg-blue-400 hover:text-inherit">Browse other events</Link>
    </div>
}