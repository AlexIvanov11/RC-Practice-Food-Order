import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// looks ugly, thats why i prefer Redux

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingItem = state.items[existingItemIndex];

      let updatedItem;
      let updatedItems;

      if (existingItem) {
        updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const item = state.items[itemIndex];
      const updatedAmount = state.totalAmount - item.price;

      let newItems;

      if (item.amount === 1) {
        newItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        newItems = [...state.items];
        newItems[itemIndex] = {
          ...item,
          amount: item.amount - 1,
        };
      }
      return {
        items: newItems,
        totalAmount: updatedAmount,
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
