"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartContext } from "./CartContext";
import toast from "react-hot-toast";

function Page() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCartContext();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    dispatch({ type: "addtocart", payload: product });
    toast.success(`${product.title.slice(0, 20)} added to cart`);
  };

  return (
    <section className="bg-[#f9f9f9] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-orange-300 rounded-xl p-4 bg-white shadow hover:shadow-md transition-all flex flex-col"
            >
              <Link href={`/Details/${product.id}`} className="w-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 sm:h-60 object-contain mb-4"
              />
              <p className="text-sm text-orange-500 font-semibold uppercase mb-1">
                {product.category}
              </p>
              <h2 className="font-bold text-black text-md mb-2 truncate">
                {product.title}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xl font-bold text-black">
                  ${(product.price * 0.5).toFixed(2)}
                </p>
                <span className="text-sm text-orange-600 font-bold bg-orange-100 px-2 py-[2px] rounded">
                  50%
                </span>
                <s className="text-gray-400 text-sm">${product.price}</s>
              </div>
              </Link>


              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-md w-full"
                >
                  Add to cart
                </button>
                <Link href={`/Details/${product.id}`} className="w-full">
                  <button className="border border-orange-400 text-orange-500 font-semibold text-sm px-4 py-2 rounded-md w-full">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;
