import QRCode from "react-qr-code"

export default function PurchaseCard({ receipt }) {
    const event = receipt.eventId
    const eventDateTime = (new Date(event.dates.start.dateTime))
    const eventDate = event.dates.start.dateTime ? eventDateTime.toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No specific date"
    const eventTime = event.dates.start.dateTime ? eventDateTime.toLocaleTimeString('en-sg', { hour: 'numeric', minute: 'numeric', timeZone: event.dates.timezone }) : null
    const gridLayout = receipt._id ? 'grid-cols-[2fr_8fr_2fr]' : 'grid-cols-[2fr_8fr]'
    return <div className={`max-w-4xl w-full grid ${gridLayout} text-left min-h-md border-double rounded-lg border-slate-500 border-4`}>
        <div className="bg-cover bg-center" style={{ backgroundImage: `url('${event.images[0].url}')` }}></div>
        <div className="flex flex-col w-full [&>div]:p-4">
            <div className="flex flex-row w-full bg-blue-800 text-darkDefault text-sm" >
                <div className="text-sm"><p className="text-lg font-extrabold">{event.name}</p><p>{`${event._embedded?.venues[0]?.name}`}</p> <p>{`${event._embedded?.venues[0]?.city?.name}, ${event._embedded?.venues[0]?.state?.name} ${event._embedded?.venues[0]?.postalCode}`}</p></div>
                <div className="ml-auto text-right">{eventDate} <br /> {eventTime}</div>
            </div>
            <div className="w-full grid grid-cols-[3fr_1fr] bg-white text-lightDefault dark:text-darkDefault dark:bg-slate-800">
                <div className="flex flex-col justify-end h-full">
                    {receipt.createdAt ? <p className="text-xs">Bought on {(new Date(receipt.createdAt)).toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p> : undefined}
                </div>
                <div className="text-center flex flex-col justify-center">
                    <p>Seats Booked:</p>
                    <p className="text-2xl font-bold">{receipt.row + (receipt.startSeat < 10 ? '0' + receipt.startSeat : receipt.startSeat)}{(receipt.endSeat !== receipt.startSeat) && '-' + (receipt.row + (receipt.endSeat < 10 ? '0' + receipt.endSeat : receipt.endSeat))}</p>
                </div>
            </div>

        </div>
        {receipt._id && <div className="border-l-[6px] border-double border-blue-800 w-full h-full bg-white flex place-items-center justify-center"><QRCode className="w-3/4 h-full" value={'https://ticketmadam.cyclic.app/verify/' + receipt._id} /></div>}
    </div>
}