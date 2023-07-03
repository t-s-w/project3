export default function PurchaseCard({ receipt }) {
    const event = receipt.eventId
    const eventDateTime = (new Date(event.dates.start.dateTime))
    const eventDate = eventDateTime.toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const eventTime = eventDateTime.toLocaleTimeString('en-sg', { hour: 'numeric', minute: 'numeric', timeZone: event.dates.timezone })
    return <div className="max-w-4xl w-full grid grid-cols-[1fr_4fr] text-left min-h-md border-double rounded-lg border-slate-500 border-4">
        <div className="bg-cover bg-center" style={{ backgroundImage: `url('${event.images[0].url}')` }}></div>
        <div className="flex flex-col w-full [&>div]:p-4">
            <div className="flex flex-row w-full bg-blue-800 text-darkDefault" >
                <div className="text-lg font-extrabold">{event.name}</div>
                <div className="ml-auto text-right">{eventDate} <br/> {eventTime}</div>
            </div>
            <div className="w-full grid grid-cols-[3fr_1fr] bg-white text-lightDefault dark:text-darkDefault dark:bg-slate-800">
                <div> <p>Venue: {event._embedded.venues[0].name}</p>
                    <p>Bought: {(new Date(receipt.createdAt)).toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                </div>
                <div className="text-center flex flex-col justify-center">
                    <p>Seats Booked:</p>
                    <p className="text-2xl font-bold">{receipt.row + (receipt.startSeat < 10 ? '0' + receipt.startSeat : receipt.startSeat)}{(receipt.endSeat !== receipt.startSeat) && '-'+(receipt.row + (receipt.endSeat < 10 ? '0' + receipt.endSeat : receipt.endSeat))}</p>
                </div>
            </div>
        </div>
    </div>
}