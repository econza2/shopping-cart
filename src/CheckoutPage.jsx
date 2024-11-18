import { useOutletContext } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const [cart, setCart, cartIDs, setCartIDs, count, setCount] =
    useOutletContext();

  let handleRemoveItem = (e) => {
    let itemIndex = cart
      .map((current) => current.id)
      .indexOf(
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data)
      );

    let newCart = cart;
    newCart.splice(itemIndex, 1);
    setCart(newCart);

    let newCartIDs = cartIDs;
    newCartIDs.splice(itemIndex, 1);
    setCartIDs(newCartIDs);

    let newCount = count;
    newCount--;
    setCount(newCount);
  };

  let pricesArray = cart.map((object) => {
    return parseFloat(object.total);
  });

  let totalPrice = pricesArray.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);

  return (
    <div className={styles.mainSegment}>
      <h1>This Is The Checkout Section</h1>
      <div className={styles.headingsContainer}>
        <div>Name</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>{""}</div>
      </div>
      {cart.map((cartItems) => (
        <div className={styles.itemsContainer} key={cartItems.id}>
          <div hidden={true}>{cartItems.id}</div>
          <div>{cartItems.name}</div>
          <div>{cartItems.price}</div>
          <div>{cartItems.quantity}</div>
          <div>{cartItems.total}</div>
          <button
            className={styles.removeItemButton}
            onClick={handleRemoveItem}
          >
            Remove Item
          </button>
        </div>
      ))}
      <div className={styles.totalContainer}>
        <div>{"Your Total Is: "}</div>
        <div>{totalPrice}</div>
      </div>
      <button className={styles.payNowButton}>Pay Now</button>
    </div>
  );
}

export default CheckoutPage;
