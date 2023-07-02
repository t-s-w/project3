export default function PurchaseCard({ receipt }) {
    console.log(receipt)
    const event = receipt.embeddedEvent
    const eventDateTime = (new Date(event.dates.start.dateTime))
    const eventDate = eventDateTime.toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const eventTime = eventDateTime.toLocaleTimeString('en-sg', { hour: 'numeric', minute: 'numeric' })
    return <div className="max-w-4xl w-full grid grid-cols-[1fr_4fr] text-left min-h-md border-double rounded-lg border-slate-500 border-4">
        <div className="bg-cover bg-center" style={{ backgroundImage: `url('${event.images[0].url}')` }}></div>
        <div className="flex flex-col w-full [&>div]:p-4">
            <div className="flex flex-row w-full bg-blue-800 text-darkDefault" >
                <div className="text-lg font-extrabold">{event.name}</div>
                <div className="ml-auto text-right">{eventDate} {eventTime}</div>
            </div>
            <div className="w-full grid grid-cols-[3fr_1fr]">
                <div> <p>Venue: {event._embedded.venues[0].name}</p>
                    <p>Bought: {(new Date(receipt.createdAt)).toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                </div>
                <div className="text-center flex flex-col justify-center">
                    <p>Seats Booked:</p>
                    <p className="text-2xl font-bold">{receipt.row + (receipt.startSeat < 10 ? '0' + receipt.startSeat : receipt.startSeat)}-{receipt.row + (receipt.endSeat < 10 ? '0' + receipt.endSeat : receipt.endSeat)}</p>
                </div>
            </div>
        </div>
    </div>
}