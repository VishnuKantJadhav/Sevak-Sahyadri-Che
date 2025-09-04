// src/pages/ArticleDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

/**
 * Converts plain article text to safe HTML with basic formatting:
 * - headings: #, ##, ###
 * - bold: **text**
 * - italic: *text*
 * - inline code: `code`
 * - lists: lines starting with '-' or '*'
 * - auto-link URLs (http/https)
 *
 * The function first escapes HTML to prevent XSS, then applies transformations.
 */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toHtmlFromPlainText(text) {
    if (!text) return "";
    // Escape
    const esc = escapeHtml(text);

    const lines = esc.split(/\r?\n/);
    let html = "";
    let inList = false;
    let paraBuffer = [];

    const flushParagraph = () => {
        if (paraBuffer.length === 0) return;
        const joined = paraBuffer.join(" ").trim();
        if (joined) html += `<p>${applyInline(joined)}</p>`;
        paraBuffer = [];
    };

    const openList = () => {
        if (!inList) {
            inList = true;
            html += "<ul>";
        }
    };
    const closeList = () => {
        if (inList) {
            html += "</ul>";
            inList = false;
        }
    };

    function applyInline(s) {
        // bold **text**
        s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        // italic *text*
        s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
        // inline code `code`
        s = s.replace(/`(.+?)`/g, "<code>$1</code>");
        // linkify http(s)://...
        s = s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
        return s;
    }

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i].trim();
        if (raw === "") {
            // blank line => paragraph break
            flushParagraph();
            closeList();
            continue;
        }

        // headings
        const h3 = raw.match(/^###\s+(.*)/);
        const h2 = raw.match(/^##\s+(.*)/);
        const h1 = raw.match(/^#\s+(.*)/);
        if (h3) {
            flushParagraph();
            closeList();
            html += `<h4 class="text-lg font-semibold text-gray-900">${applyInline(h3[1])}</h4>`;
            continue;
        }
        if (h2) {
            flushParagraph();
            closeList();
            html += `<h3 class="text-xl font-bold text-gray-900 mt-3">${applyInline(h2[1])}</h3>`;
            continue;
        }
        if (h1) {
            flushParagraph();
            closeList();
            html += `<h2 class="text-2xl font-extrabold text-saffron-600 mt-2">${applyInline(h1[1])}</h2>`;
            continue;
        }

        // list items
        const li = raw.match(/^[-*]\s+(.*)/);
        if (li) {
            openList();
            html += `<li>${applyInline(li[1])}</li>`;
            continue;
        }

        // otherwise accumulate as paragraph line
        paraBuffer.push(raw);
    }

    flushParagraph();
    closeList();

    return html;
}

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        api
            .get(`/articles/${id}/`)
            .then((res) => setArticle(res.data))
            .catch((err) => {
                console.error("Failed to load article", err);
                setArticle(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-16">
                <div className="h-56 bg-gray-100 rounded animate-pulse" />
                <div className="mt-6 space-y-3">
                    <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded" />
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto px-6 py-16">
                <div className="text-center text-gray-600">Article not found.</div>
            </div>
        );
    }

    const formatted = toHtmlFromPlainText(article.content || "");
    const dateStr = article.created_at ? new Date(article.created_at).toLocaleDateString() : "";

    return (
        <div className="container mx-auto px-4 md:px-6 py-10">
            {/* hero */}
            <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                    src={
                        article.main_image
                            ? (article.main_image.startsWith("/") ? `${window.location.origin}${article.main_image}` : article.main_image)
                            : `https://picsum.photos/seed/article-hero-${article.id}/1600/700`
                    }
                    alt={article.title}
                    className="w-full h-72 object-cover"
                />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-8">
                <main className="md:col-span-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-saffron-600">{article.title}</h1>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <div>By {article.author || "Team Fort Seva"}</div>
                        <div>•</div>
                        <div>{dateStr}</div>
                    </div>

                    <div className="mt-6 prose max-w-none text-gray-700" ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: formatted }} />
                </main>

                <aside className="space-y-4">


                    <div className="bg-white rounded-lg p-4 shadow">
                        <div className="text-sm text-gray-500">Share</div>
                        <div className="mt-3 flex gap-2">
                            <a className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">Facebook</a>
                            <a className="px-3 py-2 rounded-md bg-pink-600 text-white text-sm" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow">
                        <div className="text-sm text-gray-500">More from Legacy</div>
                        <div className="mt-3 text-sm text-gray-700">
                            {/* You can show related articles here by fetching /articles/?exclude=id&... */}
                            Check other articles to explore the life and ideas of Shivaji Maharaj.
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
