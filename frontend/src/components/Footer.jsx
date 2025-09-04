// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-10">
//       <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
//         <div>
//           <h2 className="text-lg font-bold text-white">Fort Seva</h2>
//           <p className="text-sm mt-2">
//             Preserving history, cleaning forts, and spreading the legacy of Chhatrapati Shivaji Maharaj.
//           </p>
//         </div>
//         <div>
//           <h3 className="font-semibold text-white">Quick Links</h3>
//           <ul className="mt-2 space-y-2 text-sm">
//             <li>Home</li>
//             <li>Forts</li>
//             <li>Events</li>
//             <li>Legacy</li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold text-white">Contact</h3>
//           <p className="text-sm mt-2">Email: info@fortseva.org</p>
//           <p className="text-sm">Maharashtra, India</p>
//         </div>
//       </div>
//       <div className="bg-gray-800 text-center py-3 text-sm text-gray-400">
//         © {new Date().getFullYear()} Fort Seva. All rights reserved.
//       </div>
//     </footer>
//   )
// }
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-10">
      <div className="container mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h2 className="text-xl font-bold text-white">Sevak SahyadriChe</h2>
          <p className="text-sm mt-2 leading-relaxed">
            Preserving history, cleaning forts, and spreading the legacy of
            Chhatrapati Shivaji Maharaj.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/forts" className="hover:underline">Forts</Link></li>
            <li><Link to="/events" className="hover:underline">Events</Link></li>
            <li><Link to="/legacy" className="hover:underline">Legacy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Email: info@sevaksahyadriche.org</li>
            <li>Pune, Maharashtra, India</li>
          </ul>
          <div className="mt-4 flex gap-3 text-white">
            <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Newsletter</h3>
          <p className="text-sm mt-2">
            Get updates about drives, treks and restoration events.
          </p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="rounded-lg bg-saffron-600 px-4 py-2 font-semibold hover:bg-saffron-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Sevak SahyadriChe. All rights reserved.
      </div>
    </footer>
  );
}
