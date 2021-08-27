import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => {
    setShow(false);
  };

  return (
    <CartProvider>
      {show && <Cart onClose={closeModalHandler} />}
      <Header onOpen={openModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
