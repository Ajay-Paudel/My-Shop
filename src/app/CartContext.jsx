"use client";

import { createContext, useReducer, useContext } from "react";

const CartReducer = (state, action) => {
  switch (action.type) {
    case "addtocart": {
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartList: state.cartList.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartList: [...state.cartList, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "decrement": {
      return {
        ...state,
        cartList: state.cartList
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "remove": {
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.id !== action.payload.id),
      };
    }

    case "clearcart": {
      return {
        ...state,
        cartList: [],
      };
    }

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, { cartList: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

export default CartContext;
