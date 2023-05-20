import { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

import Checkout from './Checkout';

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(true);  //changed to true ?
  
  const [isSubmitting, setIsSubmitting] = useState(false); //is it pending or not, want loading screen

  const [didSubmit, setDidSubmit] = useState(false); //is it pending or not, want loading screen


  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = event => {
    setIsCheckout(true);

  }

  //checking if all forms and order placed
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch('https://react-http-57c1f-default-rtdb.firebaseio.com/orders-json', {
      method: 'PUT',
      body: JSON.stringify({
                              user:userData,
                              orderedItems: cartCtx.items
                            })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


  //so the buttons dont show until the form is signed
  const modalActions =<div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>;


  const cartModalContent =  <Fragment>
  {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
  {!isCheckout && modalActions}
  </Fragment>;


  const isSubmittingModalContent = <p>Sending order data....</p>

  //its loading on seubmitting to database
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>;
    </Fragment>
  )



  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting  && isSubmittingModalContent}
      {!isSubmitting && didSubmit  && didSubmitModalContent}

    </Modal>
  );
};

export default Cart;
