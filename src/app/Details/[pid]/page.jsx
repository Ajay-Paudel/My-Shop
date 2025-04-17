"use client";

import { useCartContext } from "@/app/CartContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // default to 1 for better UX
  const { state, dispatch } = useCartContext();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${pid}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [pid]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        dispatch({
          type: "addtocart",
          payload: product,
        });
      }
      setQuantity(1); // reset to 1 after adding
    } else {
      alert("Please select quantity");
    }
  };

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">
        {/* Product Image and thumbnails */}
        <div className="flex flex-col items-center">
          <img
            className="w-[400px] h-[400px] object-contain border-2 border-orange-300 rounded-lg"
            src={product.image}
            alt={product.title}
          />
          <div className="flex gap-4 mt-6">
            {Array(4)
              .fill(product.image)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumbnail"
                  className="w-16 h-16 object-contain border-2 border-orange-300 rounded-md"
                />
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-orange-600 font-semibold uppercase mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-black mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <p className="text-3xl font-bold text-black">
              ${Number(product.price * 0.5).toFixed(2)}
            </p>
            <span className="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded font-bold">
              50%
            </span>
            <s className="text-gray-400 text-md">${product.price}</s>
          </div>

          {/* Quantity controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md px-4 py-2">
              <button
                className="text-2xl text-orange-500"
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
              >
                -
              </button>
              <span className="mx-4 text-lg text-black">{quantity}</span>
              <button
                className="text-2xl text-orange-500"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
