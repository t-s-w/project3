import Event from '../../models/Event.js';
// import '../../config/db.js';
import dotenv from 'dotenv'

dotenv.config()

async function refresh(req, res) {
    const acceptedEvents = []
    const seenEvents = {}
    for (let request of requests) {
        const eventData = await fetch(request).then(res => res.json())
        eventData._embedded.events.forEach(x => {
            if (x.name in seenEvents && (seenEvents[x.name] >= 3)) {
                return
            }
            if (!seenEvents[x.name]) {
                seenEvents[x.name] = 1
            }
            else {
                seenEvents[x.name] += 1
            }
            acceptedEvents.push(x)
        })
    }
    return seenEvents
}

function url(page, segment) {
    return `https://app.ticketmaster.com/discovery/v2/events.json?size=200&page=${page}&segmentName=${segment}&apikey=${process.env.TICKETMASTER_APIKEY}`
}


async function countBySeg(req, res) {
    const segments = { Music: new Set(), Sports: new Set(), "Arts%20%26%20Theatre": new Set(), Miscellaneous: new Set }
    const events = []
    for (let key in segments) {
        let page = 0
        const firstRequest = url(page, key)
        console.log(firstRequest)
        const firstPage = await fetch(firstRequest).then(res => res.json())
        const maxPages = firstPage.page.totalPages
        firstPage._embedded.events.forEach(event => {
            if (!segments[key].has(event.name) && (segments[key].size < 40)) {
                segments[key].add(event.name)
                events.push(event)
            }
        })
        while ((segments[key].size < 40) && (page < maxPages) && (page < 5)) {
            page += 1;
            let request = url(page, key)
            console.log(key, "page", page);
            const eventData = await fetch(request).then(res => res.json())
            eventData._embedded.events.forEach(event => {
                if (!segments[key].has(event.name) && (segments[key].size < 40)) {
                    segments[key].add(event.name)
                    events.push(event)
                }
            }
            )
        }
    }
    return segments
}

countBySeg().then(console.log)