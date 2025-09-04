// // import { Link, NavLink } from 'react-router-dom'

// // const NavItem = ({ to, children }) => (
// //   <NavLink
// //     to={to}
// //     className={({ isActive }) =>
// //       `px-2 py-1 rounded-md text-sm font-medium ${isActive ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/10'
// //       }`
// //     }
// //   >
// //     {children}
// //   </NavLink>
// // )

// // export default function Navbar() {
// //   return (
// //     <nav className="bg-saffron-600 sticky top-0 z-50 shadow">
// //       <div className="container mx-auto flex items-center justify-between px-4 py-3">

// //         {/* Logo + Title */}
// //         <Link to="/" className="flex items-center gap-2">
// //           <img
// //             src="/logo.jpeg"
// //             alt="Fort Seva Logo"
// //             className="h-10 w-10 rounded-full border-2 border-white shadow"
// //           />
// //           <span className="text-white font-bold text-2xl">Sevak SahyadriChe</span>
// //         </Link>

// //         {/* Navigation Items */}
// //         <div className="flex gap-2">
// //           <NavItem to="/">Home</NavItem>
// //           <NavItem to="/about">About</NavItem>
// //           <NavItem to="/forts">Forts</NavItem>
// //           <NavItem to="/events">Events</NavItem>
// //           <NavItem to="/legacy">Legacy</NavItem>
// //           <NavItem to="/get-involved">Get Involved</NavItem>
// //           <NavItem to="/contact">Contact</NavItem>
// //         </div>
// //       </div>
// //     </nav>
// //   )
// // }
// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // icons

// const NavItem = ({ to, children, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     className={({ isActive }) =>
//       `block px-3 py-2 rounded-md text-base font-medium ${isActive
//         ? "bg-white text-saffron-600"
//         : "text-white hover:bg-white/10"
//       }`
//     }
//   >
//     {children}
//   </NavLink>
// );

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-saffron-600 sticky top-0 z-50 shadow">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo + Title */}
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             src="/logo.jpeg"
//             alt="Fort Seva Logo"
//             className="h-10 w-10 rounded-full border-2 border-white shadow"
//           />
//           <span className="text-white font-bold text-2xl">
//             Sevak SahyadriChe
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-2">
//           <NavItem to="/">Home</NavItem>
//           <NavItem to="/about">About</NavItem>
//           <NavItem to="/forts">Forts</NavItem>
//           <NavItem to="/events">Events</NavItem>
//           <NavItem to="/legacy">Legacy</NavItem>
//           <NavItem to="/get-involved">Get Involved</NavItem>
//           <NavItem to="/contact">Contact</NavItem>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-saffron-600 px-2 pb-3 space-y-1">
//           <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
//           <NavItem to="/about" onClick={() => setIsOpen(false)}>About</NavItem>
//           <NavItem to="/forts" onClick={() => setIsOpen(false)}>Forts</NavItem>
//           <NavItem to="/events" onClick={() => setIsOpen(false)}>Events</NavItem>
//           <NavItem to="/legacy" onClick={() => setIsOpen(false)}>Legacy</NavItem>
//           <NavItem to="/get-involved" onClick={() => setIsOpen(false)}>Get Involved</NavItem>
//           <NavItem to="/contact" onClick={() => setIsOpen(false)}>Contact</NavItem>
//         </div>
//       )}
//     </nav>
//   );
// }
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/forts", label: "Fort's" },
  { to: "/events", label: "Event's" },
  { to: "/legacy", label: "Artical's" },
  { to: "/get-involved", label: "Get Involved" },
  // { to: "/contact", label: "Contact" },
];

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "bg-white text-saffron-600" : "text-white hover:bg-white/10"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors ${scrolled
        ? "bg-saffron-600/95 backdrop-blur ring-1 ring-black/5"
        : "bg-saffron-600"
        }`}
      aria-label="Primary"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.jpeg"
            alt="Sevak SahyadriChe Logo"
            className="h-10 w-10 rounded-full border-2 border-white shadow"
          />
          <span className="text-white font-bold text-xl md:text-2xl">
            Sevak SahyadriChe
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to}>
              {l.label}
            </NavItem>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-saffron-600 px-2 pb-3 space-y-1">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} onClick={() => setIsOpen(false)}>
              {l.label}
            </NavItem>
          ))}
        </div>
      </div>
    </nav>
  );
}
