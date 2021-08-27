import React from "react";

import HeaderCartButton from "./HeaderCartButton";
import meals from "../../img/meals.jpg";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Food from Belyash</h1>
        <HeaderCartButton />
      </header>
      <div className={styles.mainImage}>
        <img src={meals} alt="A table full of delicious meals" />
      </div>
    </>
  );
};

export default Header;
