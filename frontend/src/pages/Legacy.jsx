// export default function Legacy() {
//   const items = [
//     { year: 1630, text: "Birth of Chhatrapati Shivaji Maharaj." },
//     { year: 1674, text: "Coronation as Chhatrapati at Raigad Fort." },
//     { year: 1680, text: "Legacy continues through Swarajya ideals." }
//   ]
//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-saffron-600">Shivaji Maharaj: Legacy</h1>
//       <div className="mt-6 space-y-4">
//         {items.map((i, idx) => (
//           <div key={idx} className="bg-white p-4 rounded shadow">
//             <div className="font-semibold">{i.year}</div>
//             <div className="text-gray-700">{i.text}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// src/pages/Legacy.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

/**
 * Legacy page: timeline + articles list
 * - fetches articles from /api/articles/
 * - shows timeline and article cards
 * - supports search
 */

export default function Legacy() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const timeline = [
    { year: 1630, text: "Birth of Chhatrapati Shivaji Maharaj." },
    { year: 1674, text: "Coronation as Chhatrapati at Raigad Fort." },
    { year: 1680, text: "Legacy continues through Swarajya ideals." },
  ];

  useEffect(() => {
    api
      .get("/articles/")
      .then((res) => setArticles(res.data || []))
      .catch((err) => {
        console.error("Failed to load articles", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Create excerpt from plain content (strip markup tokens lightly)
  const makeExcerpt = (text, n = 180) => {
    if (!text) return "";
    const cleaned = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold markers
      .replace(/\*(.*?)\*/g, "$1") // remove italics markers
      .replace(/[`#>-]/g, "") // strip common markdown-ish chars
      .replace(/\s+/g, " ")
      .trim();
    return cleaned.length > n ? cleaned.slice(0, n).trim() + "…" : cleaned;
  };

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return articles;
    return articles.filter((a) => {
      return (
        (a.title || "").toLowerCase().includes(qq) ||
        (a.author || "").toLowerCase().includes(qq) ||
        (a.content || "").toLowerCase().includes(qq)
      );
    });
  }, [articles, q]);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-saffron-600">
          Legacy & Articles
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Articles, stories and historical notes about Chhatrapati Shivaji Maharaj and the Sahyadri forts.
        </p>
      </div>

      {/* Timeline + Search */}
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        {/* Timeline */}


        {/* Articles header + search */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <h3 className="text-2xl font-semibold text-gray-900">Articles</h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles, authors, content..."
                className="w-full sm:w-72 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saffron-200"
                aria-label="Search articles"
              />
              <button
                onClick={() => setQ("")}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Articles grid */}
          {loading ? (
            <div className="grid gap-4">
              <div className="h-28 bg-gray-100 rounded animate-pulse" />
              <div className="h-28 bg-gray-100 rounded animate-pulse" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-gray-600">No articles found.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, idx) => (
                <article
                  key={a.id || idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <Link to={`/articaldetails/${a.id}`}>
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={
                          a.main_image
                            ? (a.main_image.startsWith("/") ? `${window.location.origin}${a.main_image}` : a.main_image)
                            : `https://picsum.photos/seed/article-${a.id || idx}/900/600`
                        }
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500">{new Date(a.created_at).toLocaleDateString()}</div>
                      <h4 className="mt-2 text-lg font-semibold text-gray-900">{a.title}</h4>
                      <div className="mt-2 text-sm text-gray-600">{makeExcerpt(a.content)}</div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-gray-500">By {a.author || "Team Fort Seva"}</div>
                        <div className="text-xs font-semibold text-saffron-600">Read →</div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
