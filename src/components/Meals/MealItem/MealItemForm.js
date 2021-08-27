import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [valid, setValid] = useState(true);
  const inputRef = useRef();

  const submitHadler = (event) => {
    event.preventDefault();

    // remember that this is always a string
    const enteredAmount = inputRef.current.value;

    // not sure if we need this actually
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHadler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          setp: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!valid && <p>Please enter valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
