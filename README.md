# React-MealsDeliveryApp

[Check out the App Online!](https://react-meals-delivery-app.vercel.app/)

## Description
React Meals is a React app using a Context, Reducer and Provider for a simplified development process. 
Context allows me to pass data to components in a tree without having to pass down props at each level individually. A Reducer with Context allows me to control complex state changes throughout the app. 
The Provider then lets consumer components of the context know when to update due to data changes. These all are used in the app's food cart system so that data and state changes of the cart are available to all components of the app simultaneously. The app also uses google firebase for its simplicity in dealing with data.





## Coding-Keywords Used

| Keyword | Description of use |
| ------ | ----------- |
| useContext  | Lets me provide data to all components of the app from the cart |
``` js
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;
```
[Check out FULL Code](https://github.com/RafhyKhan/React-MealsDeliveryApp/blob/main/src/store/cart-context.js)

---


| Keyword | Description of use |
| ------ | ----------- |
| reducer   |  Has all state changes with dispatch, increasing code reusability, and simplicity  |
``` js
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    let updatedTotalAmount = 0;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      .......

```
[Check out FULL Code](https://github.com/RafhyKhan/React-MealsDeliveryApp/blob/main/src/store/CartProvider.js)


| Keyword | Description of use |
| ------ | ----------- |
| Provider   |  All components inside provider will be notified of cart data changes, and update via context  |
``` js
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );

```
[Check out FULL Code](https://github.com/RafhyKhan/React-MealsDeliveryApp/blob/main/src/App.js)


---

| Keyword | Description of use |
| ------ | ----------- |
| GFirebase    | Used google firebase for data management |
``` js
    await fetch('...', {
      method: 'PUT',
      body: JSON.stringify({
                              user:userData,
                              orderedItems: cartCtx.items
                            })
    });

    setIsSubmitting(false);
```
[Check out FULL code](https://github.com/RafhyKhan/React-MealsDeliveryApp/blob/main/src/components/Cart/Cart.js)

---

## END of ReadMe File