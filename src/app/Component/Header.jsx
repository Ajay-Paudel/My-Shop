"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCartContext } from '../CartContext';
import { usePathname } from 'next/navigation';

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState([]);
  const [isopen, setIsopen] = useState(false);
  const pathname = usePathname(); // track route change
  const { state } = useCartContext();

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategory(data));
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsopen(false);
    setDropdown(false);
  }, [pathname]);

  const toggleDropdown = () => setDropdown(!dropdown);
  const handleNavClick = () => setIsopen(false);

  return (
    <nav className="bg-white shadow-md">
      <h2 className="font-extrabold text-center text-black py-3">MY SHOP</h2>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center px-4">
          {/* Menu Links */}
          <ul className={`text-black lg:flex lg:gap-10 absolute lg:static top-[80px] left-0 bg-white w-full lg:w-auto transition-all duration-300 ease-in-out ${isopen ? 'block' : 'hidden lg:block'}`}>
            <li className="mx-6 py-4 hover:text-gray-600">
              <Link href="/" onClick={handleNavClick}>Home</Link>
            </li>
            <li className="mx-6 py-4 hover:text-gray-600">
              <Link href="/" onClick={handleNavClick}>About us</Link>
            </li>
            <li className="mx-6 py-4 hover:text-gray-600 relative"
              onMouseEnter={() => { if (window.innerWidth >= 768) setDropdown(true) }}
              onMouseLeave={() => { if (window.innerWidth >= 768) setDropdown(false) }}
              onClick={() => { if (window.innerWidth < 768) toggleDropdown() }}>
              Categories
              <ul className={`absolute z-10 bg-white w-40 p-4 left-0 top-10 border rounded shadow ${dropdown ? 'block' : 'hidden'}`}>
                {category.map(cat => (
                  <li key={cat} className="hover:text-orange-500">
                    <Link href={`/category/${cat}`} onClick={handleNavClick}>{cat}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mx-6 py-4 hover:text-gray-600">
              <Link href="/" onClick={handleNavClick}>Contact</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button className="lg:hidden z-20" onClick={() => setIsopen(!isopen)}>
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-black transition-transform ${isopen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-black transition-opacity ${isopen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-black transition-transform ${isopen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Cart */}
          <Link href="/cart" className="text-black ml-4">
            🛒 Cart ({state.cartList.length})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
