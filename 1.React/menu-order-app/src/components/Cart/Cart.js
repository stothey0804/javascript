import React from "react";

import classes from './Cart.module.css'
import CartItem from "./CartItem";
import Modal from "../UI/Modal";

const Cart = ({onClose}) => {
  return (
    <Modal>
      <CartItems></CartItems>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span></span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onClose}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>

  );
}

const CartItems = (props) => {
  return (
    <ul className={classes['cart-items']}>
      {[].map((item) => <CartItem></CartItem>)}
    </ul>
  );
}

export default Cart;