// import React from "react";
// import Logo from '../assets/logo.png'
// export default function Header({ onToggleCart, cartCount, onSearch, searchTerm, onOpenMenu }) {
//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center gap-4">
//             <button className="md:hidden p-2" onClick={onOpenMenu} aria-label="menu">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <div className="flex items-baseline">
//               <Logo/>

//             </div>
//           </div>

//           <div className="flex-1 mx-8 hidden md:block">
//             <div className="relative">
//               <input value={searchTerm} onChange={(e) => onSearch(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Search products, categories..." />
//               <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</button>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="hidden sm:inline text-sm px-3 py-2 rounded-md hover:bg-gray-100">Collections</button>
//             <button className="hidden sm:inline text-sm px-3 py-2 rounded-md hover:bg-gray-100">About</button>
//             <button onClick={onToggleCart} className="relative p-2 rounded-md hover:bg-gray-100">
//               <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-6 0a1 1 0 11-2 0 1 1 0 012 0zm-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
//               </svg>
//               {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
//             </button>
//             <button className="px-3 py-2 bg-indigo-600 text-white rounded-md hidden md:inline">Sign in</button>
//           </div>
//           <a href="/admin" target="_blank" rel="noreferrer" className="px-3 py-2 border rounded hidden md:inline">
//   Admin Login
// </a>
//         </div>
//       </div>
//     </header>
//   );
// }
//---------------------------------------------------------------->>>>>>>>
import React from "react";
import Logo from "../assets/logo.png";

export default function Header({ onToggleCart, cartCount, onSearch, searchTerm, onOpenMenu }) {
  return (
    <header className="bg-stone-800 text-white l-10 shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">

          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2" onClick={onOpenMenu} aria-label="menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Responsive Logo */}
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className=" w-auto sm:h-12 md:h-14 "
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8 hidden md:block">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Search products, categories..."
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-500">🔍</button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline text-sm px-3 py-2 rounded-md hover:bg-gray-100">Collections</button>
            <button className="hidden sm:inline text-sm px-3 py-2 rounded-md hover:bg-gray-100">About</button>

            {/* Cart */}
            <button onClick={onToggleCart} className="relative p-2 rounded-md hover:bg-gray-100">
              <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6
                     m12-6l2 6m-6 0a1 1 0 11-2 0 1 1 0 012 0
                     m-6 0a1 1 0 11-2 0 1 1 0 012 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md hidden md:inline">
              Sign in
            </button>
          </div>
          <br />
          {/* Admin Button */}
          <a
            href="/admin"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 border rounded hidden md:inline"
          >
            Admin Login
          </a>
        </div>
      </div>
    </header>
  );
}
