// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { api } from '../services/api'

// export default function EventDetail() {
//   const { id } = useParams()
//   const [event, setEvent] = useState(null)

//   useEffect(() => {
//     api.get(`/events/${id}/`).then(res => setEvent(res.data)).catch(() => setEvent(null))
//   }, [id])

//   if (!event) return <div className="container mx-auto px-6 py-10">Loading...</div>

//   const photos = (event.photos || '').split(',').map(s => s.trim()).filter(Boolean)

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-saffron-600">{event.title}</h1>
//       <p className="text-gray-600 mt-2">Fort: {event.fort_name} • Date: {event.date} • Status: {event.status}</p>
//       <p className="mt-4 text-gray-700">{event.description}</p>
//       <div className="grid md:grid-cols-3 gap-4 mt-6">
//         {photos.map((url, idx) => (
//           <img key={idx} src={url} alt={`photo-${idx}`} className="w-full h-48 object-cover rounded shadow" />
//         ))}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../services/api"

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    api.get(`/events/${id}/`)
      .then(res => setEvent(res.data))
      .catch(() => setEvent(null))
  }, [id])

  if (!event) {
    return <div className="container mx-auto px-6 py-12">Loading...</div>
  }

  const photos = (event.photos || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)

  // Format description similar to FortDetail
  const renderDescription = (text) => {
    if (!text) return null
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) return null

      if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        return (
          <li key={idx} className="ml-6 list-disc text-gray-700 leading-relaxed">
            {trimmed.replace(/^[-•]\s*/, "")}
          </li>
        )
      }
      return (
        <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
          {trimmed}
        </p>
      )
    })
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Image */}
      {event.banner_image && (
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={event.banner_image}
            alt={event.title}
            className="w-full h-80 object-cover"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold text-saffron-600">
            {event.title}
          </h1>
          <p className="text-gray-600 mt-2">
            📍 {event.fort_name} • 📅 {event.date} •{" "}
            <span className="font-semibold capitalize">{event.status}</span>
          </p>

          {/* Formatted description */}
          <div className="prose max-w-none mt-6">
            {renderDescription(event.description)}
          </div>

          {photos.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Event Highlights</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`photo-${idx}`}
                    className="rounded-lg shadow hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Details</h3>
          <p className="text-sm text-gray-600 mb-2">📍 Location: {event.fort_name}</p>
          <p className="text-sm text-gray-600 mb-2">📅 Date: {event.date}</p>
          <p className="text-sm text-gray-600 mb-2">📌 Status: {event.status}</p>

          {/* Auto-detect registration link */}
          {event.description?.includes("https://forms.gle") && (
            <a
              href={event.description.match(/https:\/\/forms\.gle[^\s]+/)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block w-full text-center px-6 py-3 bg-saffron-600 text-white font-semibold rounded-lg shadow hover:bg-saffron-700 transition"
            >
              Register Here
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
