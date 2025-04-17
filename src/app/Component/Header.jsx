"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCartContext } from '../CartContext';

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState([]);
  const [isopen, setIsopen] = useState(false);
  let {state , dispatch} = useCartContext()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategory(data));
  }, []);

  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <nav className="bg-white shadow-md">
      <h2 className="font-extrabold text-center text-black py-3">MY SHOP</h2>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center px-4">
          {/* Menu Links */}
          <ul className={`text-black lg:flex lg:gap-10 absolute lg:static top-[80px] left-0 bg-white w-full lg:w-auto transition-all duration-300 ease-in-out ${isopen ? 'block' : 'hidden lg:block'}`}>
            <li className="mx-6 py-4 hover:text-gray-600"><Link href="/">Home</Link></li>
            <li className="mx-6 py-4 hover:text-gray-600"><Link href="/">About us</Link></li>
            <li className="mx-6 py-4 hover:text-gray-600 relative"
              onMouseEnter={() => { if (window.innerWidth >= 768) setDropdown(true) }}
              onMouseLeave={() => { if (window.innerWidth >= 768) setDropdown(false) }}
              onClick={() => { if (window.innerWidth < 768) toggleDropdown() }}>
              Categories
              <ul className={`absolute z-10 bg-white w-40 p-4 left-0 top-10 border rounded shadow ${dropdown ? 'block' : 'hidden'}`}>
                {category.map(cat => (
                  <li key={cat} className="hover:text-orange-500">
                    <Link href={`/category/${cat}`}>{cat}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mx-6 py-4 hover:text-gray-600"><Link href="/">Contact</Link></li>
          </ul>

          {/* Hamburger */}
          <button className="lg:hidden" onClick={() => setIsopen(!isopen)}>
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-black ${isopen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-black ${isopen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-black ${isopen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Cart Placeholder */}
          <Link href={'/cart'}>
          <p className="text-black">🛒 CartCart{state.cartList.length}</p></Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
