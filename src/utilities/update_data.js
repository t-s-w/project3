import Event from '../../models/Event.js';
import vars from '../../config/vars.js';
import '../../config/db.js';

async function refresh (req,res) {
    const eventData = await fetch(vars.TICKETMASTER_API).then(res => res.json())
    eventData._embedded.events.forEach(async x => {
        const y = await Event.replaceOne({id: x.id},x,{upsert:true})
    })
}

refresh().then(x => console.log(x))