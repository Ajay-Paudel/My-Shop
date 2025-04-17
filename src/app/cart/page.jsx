"use client";

import React from "react";
import { useCartContext } from "../CartContext";

function CartPage() {
  const { state, dispatch } = useCartContext();

  const handleIncrement = (item) => {
    dispatch({ type: "addtocart", payload: item });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch({ type: "decrement", payload: item });
    }
  };

  const handleRemove = (item) => {
    dispatch({ type: "remove", payload: item });
  };

  const subtotal = state.cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = 50;

  return (
    <section className="p-10 bg-[#f9f9f9] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Cart Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <table className="w-full text-left border-separate">
            <thead className="bg-orange-500 text-sm uppercase">
              <tr>
                <th className="p-4 text-white">Product</th>
                <th className="p-4 text-white">Price</th>
                <th className="p-4 text-white">Quantity</th>
                <th className="p-4 text-white">Total</th>
                <th className="p-4 text-white"></th>
              </tr>
            </thead>
            <tbody>
              {state.cartList.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain border"
                      />
                      <div>
                        <p className="font-medium text-black">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Color: Black, Size: Small
                        </p>
                        <p className="text-sm text-gray-500">Sn: GTH-5487</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-black">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center border rounded w-fit">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="px-2 text-lg text-orange-500"
                      >
                        -
                      </button>
                      <span className="px-4 text-black">{String(item.quantity).padStart(2, "0")}</span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="px-2 text-lg text-orange-500"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-black">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-500 text-lg"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  {/* Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-black">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <p className="text-black">Subtotal</p>
              <p className="text-black">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-black">Shipping</p>
              <p>
                <span className="text-orange-500 font-medium">Flat rate: ${shippingCost}</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Shipping to <span className="font-medium">Banasree, 1219 Dhaka</span>{" "}
              <span className="text-orange-500 cursor-pointer">Change Address</span>
            </p>
            <div className="flex justify-between text-lg font-semibold mb-4">
              <p className="text-black">Total</p>
              <p className="text-black">${(subtotal + shippingCost).toFixed(2)}</p>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md text-center font-bold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
