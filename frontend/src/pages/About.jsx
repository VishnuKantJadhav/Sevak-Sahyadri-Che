// export default function About() {
//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-saffron-600">About Us</h1>
//       <p className="mt-4 text-gray-700">
//         We are a Maharashtra-based organization dedicated to cleaning and renovating forts,
//         and spreading the thoughts and life events of Chhatrapati Shivaji Maharaj.
//       </p>
//     </div>
//   )
// }
import React from "react";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            About <span className="text-yellow-200">Sevak SahyadriChe</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-yellow-100 leading-relaxed">
            A Maharashtra-based initiative dedicated to cleaning and renovating
            forts while spreading the timeless legacy of Chhatrapati Shivaji Maharaj.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Our Mission",
            desc: "Preserve and restore the forts of Maharashtra with community-driven efforts.",
            img: "clean.png",
          },
          {
            title: "Our Vision",
            desc: "Keep the legacy of Chhatrapati Shivaji Maharaj alive for generations to come.",
            img: "download (1).jpg",
          },
          {
            title: "Our Values",
            desc: "Heritage, Unity, and Service towards protecting cultural pride.",
            img: "image.png",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Timeline / Journey */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            Our Journey
          </h2>
          <div className="mt-12 relative border-l-4 border-orange-500">
            {[
              { year: "2018", text: "Started with small fort cleaning drives." },
              { year: "2020", text: "Expanded to 10+ forts across Maharashtra." },
              { year: "2023", text: "Collaborated with youth organizations for awareness." },
              { year: "2025", text: "Dreaming bigger: fort adoption and cultural festivals." },
            ].map((step, idx) => (
              <div key={idx} className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full ring-8 ring-white"></span>
                <h3 className="text-lg font-semibold text-gray-900">{step.year}</h3>
                <p className="mt-2 text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Join Our Mission</h2>
        <p className="mt-4 text-lg">
          Be part of the movement to protect and preserve our proud heritage.
        </p>
        <Link
          to="/get-involved"
          className="mt-6 inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-orange-600 font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Get Involved
        </Link>
      </section>

    </div>
  );
}
