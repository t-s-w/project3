import '../../config/db.js';
import Event from '../../models/Event.js';
import dotenv from 'dotenv'
dotenv.config()


const configs = [
    [
        { row: "A", count: 10, grade: 1 },
        { row: "B", count: 11, grade: 1 },
        { row: "C", count: 12, grade: 1 },
        { row: "D", count: 13, grade: 2 },
        { row: "E", count: 14, grade: 2 },
        { row: "F", count: 15, grade: 2 },
        { row: "G", count: 15, grade: 2 },
        { row: "H", count: 15, grade: 3 },
        { row: "I", count: 15, grade: 3 },
        { row: "J", count: 15, grade: 3 },
    ],
    [
        { row: "A", count: 11, grade: 1 },
        { row: "B", count: 11, grade: 1 },
        { row: "C", count: 11, grade: 2 },
        { row: "D", count: 11, grade: 2 },
        { row: "E", count: 11, grade: 2 },
        { row: "F", count: 11, grade: 2 },
        { row: "G", count: 11, grade: 3 },
        { row: "H", count: 11, grade: 3 },
        { row: "I", count: 11, grade: 3 },
    ],
    [
        { row: "A", count: 8, grade: 1 },
        { row: "B", count: 10, grade: 1 },
        { row: "C", count: 12, grade: 2 },
        { row: "D", count: 14, grade: 2 },
        { row: "E", count: 16, grade: 3 },
        { row: "F", count: 18, grade: 3 }
    ],
    [
        { row: "A", count: 11, grade: 1 },
        { row: "B", count: 11, grade: 1 },
        { row: "C", count: 11, grade: 1 },
        { row: "D", count: 9, grade: 2 },
        { row: "E", count: 7, grade: 2 },
        { row: "F", count: 7, grade: 2 },
        { row: "G", count: 7, grade: 3 },
        { row: "H", count: 9, grade: 3 },
        { row: "I", count: 11, grade: 3 },
    ]
]

const priceranges = [
    [0, 50, 40, 30],
    [0, 20, 18, 16],
    [0, 100, 90, 80],
    [0, 30, 27, 25],
    [0, 60, 55, 50]
]

function generateRandomConfig() {
    const a = parseInt(Math.random() * configs.length)
    const b = parseInt(Math.random() * priceranges.length)
    return { prices: priceranges[b], seats: configs[a] }
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
                event.seatConfig = generateRandomConfig()
                Event.create(event).then(x => console.log("added", x.name)).catch(err => console.log("error", err.message))
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
                    event.seatConfig = generateRandomConfig()
                    Event.create(event).then(x => console.log("added", x.name)).catch(err => console.log("error", err.message))
                }
            }
            )
        }
    }
    return segments
}

countBySeg().then(console.log)