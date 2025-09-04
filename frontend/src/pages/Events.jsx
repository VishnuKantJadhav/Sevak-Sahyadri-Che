// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { api } from '../services/api'

// export default function Events() {
//   const [events, setEvents] = useState([])

//   useEffect(() => {
//     api.get('/events/').then(res => setEvents(res.data)).catch(() => setEvents([]))
//   }, [])

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-saffron-600 mb-6">Events</h1>
//       <div className="space-y-4">
//         {events.map(e => (
//           <Link to={`/events/${e.id}`} key={e.id} className="block bg-white shadow rounded-lg p-6">
//             <h3 className="font-semibold">{e.title}</h3>
//             <p className="text-sm text-gray-600">Fort: {e.fort_name} • Date: {e.date} • Status: {e.status}</p>
//           </Link>
//         ))}
//         {events.length === 0 && <p className="text-gray-600">No events yet. Add from admin or API.</p>}
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../services/api"

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get("/events/")
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]))
  }, [])

  const statusColors = {
    upcoming: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700"
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-saffron-600 mb-10 text-center">
        Upcoming & Past Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events yet. Check back soon!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(e => (
            <Link
              to={`/events/${e.id}`}
              key={e.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              {e.banner_image && (
                <img
                  src={e.banner_image}
                  alt={e.title}
                  className="h-40 w-full object-cover group-hover:scale-105 transition"
                />
              )}
              <div className="p-6">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors[e.status] || "bg-gray-100 text-gray-600"}`}>
                  {e.status}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-800 group-hover:text-saffron-600">
                  {e.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {e.fort_name} <br />
                  📅 {e.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
