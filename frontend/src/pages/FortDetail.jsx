// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { api } from '../services/api'

// export default function FortDetail() {
//   const { id } = useParams()
//   const [fort, setFort] = useState(null)

//   useEffect(() => {
//     api.get(`/forts/${id}/`).then(res => setFort(res.data)).catch(() => setFort(null))
//   }, [id])

//   if (!fort) return <div className="container mx-auto px-6 py-10">Loading...</div>

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="md:col-span-2">
//           {fort.image_url && <img src={fort.image_url} alt={fort.name} className="w-full rounded shadow" />}
//           <h1 className="text-3xl font-bold text-saffron-600 mt-4">{fort.name}</h1>
//           <p className="text-gray-700 mt-2">{fort.description}</p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-semibold">Details</h3>
//           <p className="text-sm text-gray-600 mt-2">District: {fort.district || '-'}</p>
//           <p className="text-sm text-gray-600">Location: {fort.location || '-'}</p>
//           <p className="text-sm text-gray-600">Status: {fort.status}</p>
//           {fort.latitude && fort.longitude && (
//             <a className="text-saffron-600 underline mt-2 inline-block"
//                href={`https://www.google.com/maps?q=${fort.latitude},${fort.longitude}`}
//                target="_blank" rel="noreferrer">Open in Google Maps</a>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
// frontend/src/pages/FortDetail.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

/**
 * FortDetail - modern detail page for a Fort
 *
 * Expects API at:
 *  GET /forts/:id/    -> returns fort object with possibility of:
 *     main_image, image, image_url, images (array), name, description, district, location, latitude, longitude, status, created_at
 *  GET /events/       -> returns list of events (each with `.fort` referencing fort id)
 *
 * Replace `saffron-600` classes with available Tailwind colors if not defined.
 */

export default function FortDetail() {
  const { id } = useParams();
  const [fort, setFort] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel state
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get(`/forts/${id}/`), api.get("/events/")])
      .then(([fortRes, eventsRes]) => {
        setFort(fortRes.data);
        setEvents(eventsRes.data || []);
      })
      .catch((err) => {
        console.error("Failed to load fort or events:", err);
        setFort(null);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  function formatDescription(desc) {
    // Split into paragraphs on double line breaks
    const paragraphs = desc.split(/\n\s*\n/);

    // Wrap each paragraph in <p> with bold highlights
    return paragraphs
      .map(p =>
        `<p>${p
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // **bold** support
          .trim()}</p>`
      )
      .join("");
  }


  // Helper to resolve image URL (relative -> absolute)
  const resolveUrl = (raw) => {
    if (!raw) return null;
    if (typeof raw === "object" && raw.image) raw = raw.image;
    if (typeof raw !== "string") return null;
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
    if (raw.startsWith("//")) return `${window.location.protocol}${raw}`;
    if (raw.startsWith("/")) return `${window.location.origin}${raw}`;
    return raw;
  };

  // Collect gallery images in prioritized order
  const gallery = useMemo(() => {
    if (!fort) return [];
    const imgs = [];
    if (fort.main_image) imgs.push(resolveUrl(fort.main_image));
    if (fort.image) imgs.push(resolveUrl(fort.image));
    if (fort.image_url) imgs.push(resolveUrl(fort.image_url));
    if (Array.isArray(fort.images) && fort.images.length) {
      fort.images.forEach((it) => {
        if (typeof it === "string") {
          const u = resolveUrl(it);
          if (u) imgs.push(u);
        } else if (it && it.image) {
          const u = resolveUrl(it.image);
          if (u) imgs.push(u);
        }
      });
    }
    // dedupe & remove nulls
    const final = Array.from(new Set(imgs.filter(Boolean)));
    // fallback placeholder if none
    if (final.length === 0) {
      final.push(`https://picsum.photos/seed/fort-${id}/1600/1000`);
    }
    return final;
  }, [fort, id]);

  // Autoplay carousel
  useEffect(() => {
    if (!gallery || gallery.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, 4500);
    return () => clearInterval(autoplayRef.current);
  }, [gallery]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
    resetAutoplay();
  };
  const goNext = () => {
    setIndex((i) => (i + 1) % gallery.length);
    resetAutoplay();
  };
  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, 4500);
  };

  // Filter upcoming events for this fort (frontend filter)
  const fortEvents = useMemo(() => {
    if (!fort || !events) return [];
    return (events || []).filter((ev) => {
      // `ev.fort` might be id or object depending on serializer; handle both
      if (ev.fort === undefined || ev.fort === null) return false;
      if (typeof ev.fort === "number") return Number(ev.fort) === Number(fort.id);
      if (typeof ev.fort === "object" && ev.fort.id) return Number(ev.fort.id) === Number(fort.id);
      // sometimes event serializer returns fort as name/slug - try slug match
      if (ev.fort === fort.slug) return true;
      return false;
    });
  }, [events, fort]);

  // parse status; same logic as previous component logic
  const parseStatuses = (statusField) => {
    if (!statusField) return [];
    if (Array.isArray(statusField)) return statusField;
    if (typeof statusField === "string") {
      if (statusField.includes(",")) return statusField.split(",").map((s) => s.trim()).filter(Boolean);
      return [statusField];
    }
    return [];
  };

  const statusLabel = {
    clean: "Clean",
    needs_cleaning: "Needs Cleaning",
    under_renovation: "Under Renovation",
  };

  const statusStyle = (s) => {
    if (!s) return "bg-gray-100 text-gray-800";
    s = s.toLowerCase();
    if (s.includes("clean")) return "bg-green-100 text-green-800";
    if (s.includes("renovation") || s.includes("renovate")) return "bg-yellow-100 text-yellow-800";
    if (s.includes("needs")) return "bg-orange-100 text-orange-800";
    return "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded md:col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!fort) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-gray-600">Fort not found or failed to load.</div>
      </div>
    );
  }

  const statuses = parseStatuses(fort.status);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Carousel + Description */}
        <div className="md:col-span-2 space-y-6">
          {/* Carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-64 sm:h-80 md:h-96">
              {gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${fort.name} - ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}

              {/* left/right controls */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
                  >
                    ›
                  </button>
                </>
              )}

              {/* status badges on top-left */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                {statuses.slice(0, 3).map((s, idx) => (
                  <span key={idx} className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle(s)}`}>
                    {statusLabel[s] || s}
                  </span>
                ))}
              </div>

              {/* thumbnail strip (bottom) */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-20 flex gap-2">
                {gallery.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => { setIndex(i); resetAutoplay(); }}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-10 w-16 overflow-hidden rounded-md border ${i === index ? "ring-2 ring-white" : "ring-1 ring-black/10"}`}
                  >
                    <img src={g} className="w-full h-full object-cover" alt={`thumb ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-saffron-600">{fort.name}</h1>
            <p className="text-sm text-gray-500">{fort.district} {fort.location ? `· ${fort.location}` : ""}</p>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">About This Fort</h2>

              {fort.description ? (
                <div
                  className="prose prose-lg max-w-none text-justify text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: formatDescription(fort.description) }}
                />
              ) : (
                <p className="text-gray-500 italic">No description available.</p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Upcoming Events</h3>
            {fortEvents.length === 0 ? (
              <div className="text-gray-600">No upcoming events. Check back later or add one via admin.</div>
            ) : (
              <div className="grid gap-3">
                {fortEvents.map((ev) => (
                  <div key={ev.id} className="rounded-lg border border-gray-100 p-3 flex items-start justify-between hover:shadow transition">
                    <div>
                      <p className="text-sm text-gray-500">{new Date(ev.date).toLocaleDateString()}</p>
                      <h4 className="font-semibold">{ev.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{ev.description?.slice(0, 140)}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Link to={`/events/${ev.id}`} className="text-saffron-700 text-sm font-semibold">Details</Link>
                      <Link to="/get-involved" className="bg-saffron-600 text-white px-3 py-1 rounded text-sm hover:bg-saffron-700">Join</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Details card */}
        <aside className="sticky top-24">
          <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Quick Details</h4>
                <p className="text-xs text-gray-500 mt-1">Essential info about this fort</p>
              </div>
              {/* optional admin edit (navigates to Django admin change page) */}
              <div className="hidden md:block">
                <a
                  href={`/admin/core/fort/${fort.id}/change/`}
                  className="text-xs px-3 py-1 rounded bg-gray-50 border border-gray-100 text-gray-700 hover:bg-gray-100"
                >
                  Edit (Admin)
                </a>
              </div>
            </div>

            <div className="grid gap-2 text-sm text-gray-600">
              <div><strong>District:</strong> {fort.district || "—"}</div>
              <div><strong>Location:</strong> {fort.location || "—"}</div>
              <div><strong>Status:</strong> <span className="ml-2">{statuses.map((s, i) => <span key={i} className={`inline-block px-2 py-0.5 text-xs rounded ${statusStyle(s)} mr-1`}>{statusLabel[s] || s}</span>)}</span></div>
              <div><strong>Added:</strong> {fort.created_at ? new Date(fort.created_at).toLocaleDateString() : "—"}</div>
              <div><strong>Events:</strong> {fortEvents.length}</div>
            </div>

            {/* Map embed if coordinates exist */}
            {fort.latitude && fort.longitude ? (
              <div className="mt-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Map</h5>
                <div className="w-full h-40 rounded overflow-hidden border">
                  <iframe
                    title={`${fort.name} location`}
                    src={`https://www.google.com/maps?q=${fort.latitude},${fort.longitude}&z=13&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <a
                  className="mt-2 inline-block text-sm text-saffron-700 hover:underline"
                  href={`https://www.google.com/maps?q=${fort.latitude},${fort.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Coordinates not provided.</div>
            )}

            {/* CTA buttons */}
            <div className="mt-3 flex gap-2">
              <Link to="/get-involved" className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md bg-saffron-600 text-white font-semibold hover:bg-saffron-700">
                Volunteer
              </Link>
              <Link to="/events" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 text-gray-700">
                View Events
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
