
// // import { Link } from "react-router-dom";

// // export default function Home() {
// //   return (
// //     <section>
// //       {/* Hero Section */}


// //       <div className="relative text-white overflow-hidden">

// //         {/* The automatic image carousel */}
// //         <div className="absolute inset-0 w-full h-full">
// //           {/* Image 1 (Example) */}
// //           <img
// //             src="/banner2.jpg"
// //             alt="Chhatrapati Shivaji Maharaj"
// //             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
// //           />

// //           {/* Image 2 (Example - starts with opacity-0) */}
// //           <img
// //             src="/nbn.jpeg"
// //             alt="Raigad Fort"
// //             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0"
// //           />

// //           {/* Image 3 (Example - starts with opacity-0) */}
// //           <img
// //             src="/banner.jpg"
// //             alt="Sinhagad Fort"
// //             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0"
// //           />
// //         </div>

// //         {/* The gradient overlay and text content, positioned over the slider */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

// //         <div className="relative py-20 px-4 md:py-32 md:px-6">
// //           <div className="max-w-xl text-left md:text-left mx-auto md:mx-0">
// //             <h1 className="text-4xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg leading-snug">
// //               Preserving the Legacy
// //             </h1>
// //             <p className="mt-4 md:mt-6 text-base md:text-xl leading-relaxed drop-shadow-md opacity-90">
// //               Join us in cleaning and renovating forts while spreading the vision of Chhatrapati Shivaji Maharaj.
// //             </p>
// //             <Link
// //               to="/get-involved"
// //               className="inline-block mt-8 px-6 py-3 bg-saffron-600 text-white font-bold rounded-lg shadow-xl hover:bg-saffron-700 hover:shadow-2xl transition duration-300"
// //             >
// //               Get Involved
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mission Highlights */}
// //       <div className="container mx-auto py-12 md:py-20 px-4 md:px-8 grid gap-8 md:gap-10 md:grid-cols-3">
// //         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
// //           <img
// //             src="/clean.png"
// //             alt="Fort Cleaning"
// //             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
// //           />
// //           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
// //             Fort Cleaning
// //           </h2>
// //           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
// //             We organize drives to clean and preserve historic forts.
// //           </p>
// //         </div>

// //         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
// //           <img
// //             src="/dag.jpeg"
// //             alt="Renovation"
// //             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
// //           />
// //           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
// //             Renovation
// //           </h2>
// //           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
// //             Renovating damaged structures to maintain cultural heritage.
// //           </p>
// //         </div>

// //         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
// //           <img
// //             src="/image.png"
// //             alt="History & Legacy"
// //             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
// //           />
// //           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
// //             History & Legacy
// //           </h2>
// //           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
// //             Sharing the teachings and life of Chhatrapati Shivaji Maharaj.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Call to Action */}
// //       <div className="bg-gradient-to-r from-saffron-600 to-orange-500 py-12 md:py-20 text-center text-white px-4">
// //         <h2 className="text-2xl md:text-5xl font-bold leading-snug">
// //           Be a Part of Our Mission
// //         </h2>
// //         <p className="mt-3 md:mt-5 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
// //           Together we can protect history and pass on the courage and vision of
// //           Chhatrapati Shivaji Maharaj to the next generations.
// //         </p>
// //         <Link
// //           to="/get-involved"
// //           className="inline-block mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 bg-white text-saffron-600 font-bold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
// //         >
// //           Join Us
// //         </Link>
// //       </div>
// //     </section >
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const images = [
//     '/banner2.jpg',
//     '/nbn.jpeg',
//     '/banner.jpg'
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // Set up an interval to change the image every 5 seconds (5000ms)
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section>
//       {/* Hero Section */}
//       <div className="relative text-white overflow-hidden">
//         {/* The automatic image carousel */}
//         <div className="absolute inset-0 w-full h-full">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Hero banner ${index + 1}`}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
//                 }`}
//             />
//           ))}
//         </div>

//         {/* The gradient overlay and text content, positioned over the slider */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

//         <div className="relative py-20 px-4 md:py-32 md:px-6">
//           <div className="max-w-xl text-left md:text-left mx-auto md:mx-0">
//             <h1 className="text-4xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg leading-snug">
//               Preserving the Legacy
//             </h1>
//             <p className="mt-4 md:mt-6 text-base md:text-xl leading-relaxed drop-shadow-md opacity-90">
//               Join us in cleaning and renovating forts while spreading the vision of Chhatrapati Shivaji Maharaj.
//             </p>
//             <Link
//               to="/get-involved"
//               className="inline-block mt-8 px-6 py-3 bg-saffron-600 text-white font-bold rounded-lg shadow-xl hover:bg-saffron-700 hover:shadow-2xl transition duration-300"
//             >
//               Get Involved
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mission Highlights */}
//       <div className="container mx-auto py-12 md:py-20 px-4 md:px-8 grid gap-8 md:gap-10 md:grid-cols-3">
//         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
//           <img
//             src="/clean.png"
//             alt="Fort Cleaning"
//             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
//           />
//           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
//             Fort Cleaning
//           </h2>
//           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
//             We organize drives to clean and preserve historic forts.
//           </p>
//         </div>

//         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
//           <img
//             src="/dag.jpeg"
//             alt="Renovation"
//             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
//           />
//           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
//             Renovation
//           </h2>
//           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
//             Renovating damaged structures to maintain cultural heritage.
//           </p>
//         </div>

//         <div className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-5 md:p-6 transform hover:-translate-y-2 hover:scale-105 transition duration-300">
//           <img
//             src="/image.png"
//             alt="History & Legacy"
//             className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
//           />
//           <h2 className="text-lg md:text-2xl font-semibold text-saffron-600 mt-4 md:mt-6">
//             History & Legacy
//           </h2>
//           <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
//             Sharing the teachings and life of Chhatrapati Shivaji Maharaj.
//           </p>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-saffron-600 to-orange-500 py-12 md:py-20 text-center text-white px-4">
//         <h2 className="text-2xl md:text-5xl font-bold leading-snug">
//           Be a Part of Our Mission
//         </h2>
//         <p className="mt-3 md:mt-5 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
//           Together we can protect history and pass on the courage and vision of
//           Chhatrapati Shivaji Maharaj to the next generations.
//         </p>
//         <Link
//           to="/get-involved"
//           className="inline-block mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 bg-white text-saffron-600 font-bold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
//         >
//           Join Us
//         </Link>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wrench,
  BookOpen,
  Users,
  MapPin,
  CalendarDays,
  Landmark,
} from "lucide-react";

// Dummy images (remote). Replace with your /public images anytime.
const HERO_IMAGES = [
  "https://picsum.photos/id/1015/1600/900",
  "https://picsum.photos/id/1040/1600/900",
  "https://picsum.photos/id/1039/1600/900",
];

const FEATURED_FORTS = [
  {
    id: 2,
    name: "Raigad",
    district: "Raigad",
    status: "Clean",
    img: "https://picsum.photos/id/1022/800/600",
  },
  {
    id: 1,
    name: "Sinhagad",
    district: "Pune",
    status: "Needs Cleaning",
    img: "https://picsum.photos/id/1018/800/600",
  },
  {
    id: 3,
    name: "Pratapgad",
    district: "Satara",
    status: "Under Renovation",
    img: "https://picsum.photos/id/1016/800/600",
  },
  {
    id: 4,
    name: "Torna",
    district: "Pune",
    status: "Clean",
    img: "https://picsum.photos/id/1005/800/600",
  },
  {
    id: 5,
    name: "Lohagad",
    district: "Pune",
    status: "Needs Cleaning",
    img: "https://picsum.photos/id/1024/800/600",
  },
  {
    id: 6,
    name: "Rajgad",
    district: "Pune",
    status: "Clean",
    img: "https://picsum.photos/id/1003/800/600",
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Sinhagad Clean-up Drive",
    date: "2025-09-14",
    where: "Sinhagad, Pune",
  },
  {
    id: 2,
    title: "Raigad Awareness Trek",
    date: "2025-09-28",
    where: "Raigad, Raigad",
  },
  {
    id: 3,
    title: "Pratapgad Restoration Aid",
    date: "2025-10-05",
    where: "Pratapgad, Satara",
  },
];

export default function Home() {
  // --- Hero carousel state ---
  const [slide, setSlide] = useState(0);
  const autoRef = useRef(null);
  useEffect(() => {
    autoRef.current = setInterval(
      () => setSlide((s) => (s + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(autoRef.current);
  }, []);

  // --- Animated counters (stats) ---
  const stats = useMemo(
    () => [
      { label: "Forts Cleaned", value: 27 },
      { label: "Volunteers", value: 560 },
      { label: "Events Completed", value: 12 },
      { label: "Trees Planted", value: 1320 },
    ],
    []
  );
  const [counts, setCounts] = useState(stats.map(() => 0));
  useEffect(() => {
    const duration = 1000; // ms
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setCounts(stats.map((s) => Math.round(s.value * t)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [stats]);

  return (
    <section className="flex flex-col">
      {/* ================= Hero ================= */}
      <div className="relative text-white overflow-hidden">
        {/* Images */}
        <div className="absolute inset-0 w-full h-full">
          {HERO_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Hero ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${i === slide ? "opacity-100" : "opacity-0"
                }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow">
              Preserving the Legacy
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-xl leading-relaxed opacity-95">
              We clean and renovate forts and spread the thoughts and life of
              Chhatrapati Shivaji Maharaj across Maharashtra.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-saffron-600 text-white font-semibold shadow hover:bg-saffron-700 transition"
              >
                Get Involved
              </Link>
              <Link
                to="/forts"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/90 text-saffron-700 font-semibold shadow hover:bg-white transition"
              >
                Explore Forts
              </Link>
            </div>
            {/* Dots */}
            <div className="mt-6 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-2 w-6 rounded-full transition ${i === slide ? "bg-white" : "bg-white/50 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =============== Mission & Vision (Features) =============== */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Sparkles className="h-6 w-6" />}
            title="Clean"
            text="Regular clean-up drives to protect our heritage."
          />
          <Feature
            icon={<Wrench className="h-6 w-6" />}
            title="Renovate"
            text="Support careful restoration with experts and local bodies."
          />
          <Feature
            icon={<BookOpen className="h-6 w-6" />}
            title="Educate"
            text="Share the life events and values of Shivaji Maharaj."
          />
          <Feature
            icon={<Users className="h-6 w-6" />}
            title="Mobilize"
            text="Build a strong volunteer community across Maharashtra."
          />
        </div>
      </div>

      {/* =============== Featured Forts =============== */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Landmark className="h-7 w-7 text-saffron-600" />
              Featured Forts
            </h2>
            <Link
              to="/forts"
              className="text-saffron-700 font-semibold hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_FORTS.map((f) => (
              <article
                key={f.id}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={f.img}
                    alt={`${f.name} fort`}
                    className="h-56 w-full object-cover group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-900">
                    {f.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {f.district}, Maharashtra
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/forts/${f.id}`}
                      className="text-saffron-700 font-semibold hover:underline"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* =============== Legacy Section =============== */}
      <div className="relative overflow-hidden">
        <img
          src="nbn.jpeg"
          alt="Legacy background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
        <div className="relative container mx-auto px-4 md:px-8 py-14 md:py-20 text-white">
          <blockquote className="max-w-3xl">
            <p className="text-xl md:text-3xl font-semibold leading-relaxed">
              “Freedom is a boon, which everyone has the right to receive.”
            </p>
            <footer className="mt-4 text-white/80">
              — Chhatrapati Shivaji Maharaj
            </footer>
          </blockquote>
          <Link
            to="/forts"
            className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-xl 
             bg-[#FF9933] text-white font-semibold shadow-md 
             hover:bg-[#e68a2e] hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FF9933]/50 transition"
          >
            Explore the Legacy
          </Link>

        </div>
      </div>

      {/* =============== Upcoming Events =============== */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex items-center gap-2 mb-6">
          <CalendarDays className="h-7 w-7 text-saffron-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Upcoming Events
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_EVENTS.map((e) => (
            <div
              key={e.id}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">{e.date}</p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {e.where}
              </p>
              <div className="mt-4">
                <Link
                  to="/events"
                  className="text-saffron-700 font-semibold hover:underline"
                >
                  Join this event →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =============== Stats =============== */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center rounded-2xl bg-white/5 p-6 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white">
                  {counts[i].toLocaleString()}
                </div>
                <div className="mt-2 text-sm md:text-base text-white/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =============== CTA =============== */}
      <div className="bg-gradient-to-r from-saffron-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Be a Part of Our Mission
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg opacity-95 max-w-2xl mx-auto">
            Together we can protect history and pass on the courage and vision
            of Chhatrapati Shivaji Maharaj to the next generations.
          </p>
          <div className="mt-6">
            <Link
              to="/get-involved"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-saffron-700 font-semibold shadow hover:bg-white/95 transition"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small, reusable feature card */
function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="h-11 w-11 grid place-items-center rounded-xl bg-saffron-50 text-saffron-700">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
