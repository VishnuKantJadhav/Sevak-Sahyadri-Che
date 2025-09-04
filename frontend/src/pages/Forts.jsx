// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { api } from '../services/api'

// export default function Forts() {
//   const [forts, setForts] = useState([])

//   useEffect(() => {
//     api.get('/forts/').then(res => setForts(res.data)).catch(() => setForts([]))
//   }, [])

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-saffron-600 mb-6">Forts</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {forts.map(f => (
//           <Link to={`/forts/${f.id}`} key={f.id} className="bg-white shadow rounded-lg overflow-hidden">
//             {f.image_url && <img src={f.image_url} alt={f.name} className="h-40 w-full object-cover" />}
//             <div className="p-4">
//               <h3 className="font-semibold">{f.name}</h3>
//               <p className="text-sm text-gray-600">{f.district}</p>
//               <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-orange-100 text-saffron-600">{f.status}</span>
//             </div>
//           </Link>
//         ))}
//         {forts.length === 0 && <p className="text-gray-600">No forts yet. Add from admin or API.</p>}
//       </div>
//     </div>
//   )
// }

// frontend/src/pages/Forts.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

/**
 * Modern Forts page
 * - search + filter
 * - responsive grid
 * - image fallback & resolving relative -> absolute URL
 * - entrance animation (stagger)
 */

export default function Forts() {
  const [forts, setForts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" or a status key ('clean', 'needs_cleaning', 'under_renovation')
  const [visible, setVisible] = useState(false); // triggers entry animation

  useEffect(() => {
    api
      .get("/forts/")
      .then((res) => {
        setForts(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load forts:", err);
        setForts([]);
      })
      .finally(() => {
        setLoading(false);
        // kick off animation a tiny bit after data arrives
        setTimeout(() => setVisible(true), 120);
      });
  }, []);

  // Resolve an image URL coming from the API:
  // - Accepts absolute URL, '/media/...' relative path, or direct string.
  const resolveUrl = (url) => {
    if (!url) return null;
    // If object with .image (fort.images[0].image)
    if (typeof url === "object" && url.image) url = url.image;
    if (typeof url !== "string") return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("//")) return window.location.protocol + url; // protocol-relative
    if (url.startsWith("/")) return `${window.location.origin}${url}`;
    // fallback as-is
    return url;
  };

  // pick best image for a fort
  const getFortImage = (f) => {
    // possible keys: main_image, image, image_url (older), images (list of objects with .image)
    if (f.main_image) {
      const url = resolveUrl(f.main_image);
      if (url) return url;
    }
    if (f.image) {
      const url = resolveUrl(f.image);
      if (url) return url;
    }
    if (f.image_url) {
      const url = resolveUrl(f.image_url);
      if (url) return url;
    }
    if (Array.isArray(f.images) && f.images.length > 0) {
      // images may be [{ id, image, caption }, ...]
      const url = resolveUrl(f.images[0].image || f.images[0]);
      if (url) return url;
    }
    // final fallback placeholder (unsplash / picsum)
    return `https://picsum.photos/seed/fort-${encodeURIComponent(f.name || "unknown")}/800/520`;
  };

  // status can be array, comma string, or single string.
  const parseStatuses = (statusField) => {
    if (!statusField) return [];
    if (Array.isArray(statusField)) return statusField;
    if (typeof statusField === "string") {
      // django-multiselectfield may return comma-separated or JSONish string
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

  // Filter + search applied list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forts.filter((f) => {
      if (!f) return false;
      // status filter:
      if (statusFilter) {
        const statuses = parseStatuses(f.status);
        // some APIs return caps - normalize
        const normalized = statuses.map((x) => String(x).toLowerCase());
        if (!normalized.includes(statusFilter.toLowerCase())) return false;
      }
      if (!q) return true;
      // search in name / district / location
      const hay = `${f.name || ""} ${f.district || ""} ${f.location || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [forts, query, statusFilter]);

  // small UI: status chips
  const statusChips = [
    { key: "", label: "All" },
    { key: "clean", label: "Clean" },
    { key: "needs_cleaning", label: "Needs Cleaning" },
    { key: "under_renovation", label: "Under Renovation" },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-saffron-600">Forts</h1>
          <p className="mt-1 text-gray-600 max-w-xl">
            Explore forts across Maharashtra — see their status, images and events. Join drives to preserve them.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, district or location..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saffron-200"
              aria-label="Search forts"
            />
            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex gap-2 items-center">
            {statusChips.map((c) => (
              <button
                key={c.key}
                onClick={() => setStatusFilter(c.key)}
                className={`text-sm px-3 py-1.5 rounded-full border transition ${statusFilter === c.key
                    ? "bg-white text-saffron-600 border-saffron-600 font-semibold shadow"
                    : "bg-white/50 text-gray-700 border-transparent hover:bg-white/70"
                  }`}
                aria-pressed={statusFilter === c.key}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid place-items-center py-28">
          <div className="text-gray-500">Loading forts...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          No forts found. Try adjusting filters or add forts from the admin.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((f, idx) => {
            const img = getFortImage(f);
            const statuses = parseStatuses(f.status);
            return (
              <Link
                to={`/forts/${f.id}`}
                key={f.id}
                className={`group block rounded-xl overflow-hidden bg-white shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl`}
                style={{
                  // simple stagger entrance
                  transitionProperty: "opacity, transform",
                  transitionDuration: "600ms",
                  transitionTimingFunction: "cubic-bezier(.165,.84,.44,1)",
                  transitionDelay: `${idx * 80}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0px)" : "translateY(12px)",
                }}
              >
                <div className="relative h-52 sm:h-44 md:h-52 overflow-hidden">
                  <img
                    src={img}
                    alt={f.name || "Fort image"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transform transition duration-500"
                  />
                  {/* status badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {statuses.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle(s)}`}
                      >
                        {statusLabel[s] || String(s)}
                      </span>
                    ))}
                  </div>
                  {/* subtle gradient bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{f.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{f.district || f.location}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-500">{/* possibly show count of events */}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{new Date(f.created_at || "").getFullYear() || ""}</span>
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/90 text-saffron-700 font-semibold">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
