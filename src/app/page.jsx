"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCartContext } from './CartContext';

function Page() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCartContext();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="bg-[#f9f9f9] min-h-screen py-8">
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 px-4">
        {products.map(product => (
          <div key={product.id} className="border border-orange-300 rounded-xl p-4 bg-white shadow hover:shadow-md transition-all">
            <img src={product.image} alt={product.title} className="w-full h-[250px] object-contain mb-4" />
            <p className="text-sm text-orange-500 font-semibold uppercase mb-1">{product.category}</p>
            <h2 className="font-bold text-black text-md mb-2 truncate">{product.title}</h2>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xl font-bold text-black">${(product.price * 0.5).toFixed(2)}</p>
              <span className="text-sm text-orange-600 font-bold bg-orange-100 px-2 py-[2px] rounded">50%</span>
              <s className="text-gray-400 text-sm">${product.price}</s>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: 'addtocart', payload: product })}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-md"
              >
                Add to cart
              </button>
              <Link href={`/Details/${product.id}`}>
                <button className="flex-1 border border-orange-400 text-orange-500 font-semibold text-sm px-4 py-2 rounded-md">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
