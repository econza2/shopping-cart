import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";
import style from "./ShopPage.module.css";

function ShoppingPage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartIDs, setCartIDs] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        let itemDetails = json;
        let quantityArray = [];
        for (let i = 0; i < itemDetails.length; i++) {
          quantityArray[i] = {
            id: itemDetails[i]["id"],
            title: itemDetails[i]["title"],
            quantity: 1,
          };
        }

        setQuantity(quantityArray);
        setProducts(json);
      })
      .finally(() => setLoading(false));
  }, []);

  let handleQuantityChange = (e) => {
    setQuantity([
      ...quantity,
      (quantity[
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
      ]["quantity"] = parseInt(e.target.value)),
    ]);
  };

  let handleQuantityIncrease = (e) => {
    let newValue =
      quantity[
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
      ]["quantity"] + 1;

    setQuantity([
      ...quantity,
      (quantity[
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
      ]["quantity"] = newValue),
    ]);
  };

  let handleQuantityDecrease = (e) => {
    if (
      quantity[
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
      ]["quantity"] === 1
    ) {
      setQuantity([
        ...quantity,
        (quantity[
          parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
        ]["quantity"] = 1),
      ]);
    } else {
      setQuantity([
        ...quantity,
        (quantity[
          parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) - 1
        ]["quantity"] =
          quantity[
            parseInt(e.target.parentElement.childNodes[0].childNodes[0].data) -
              1
          ]["quantity"] - 1),
      ]);
    }
  };

  let handleAddToCart = (e) => {
    let cartIndex = parseInt(
      e.target.parentElement.childNodes[0].childNodes[0].data
    );

    if (cartIDs.indexOf(cartIndex) === -1) {
      let newCartIDsUnfound = cartIDs;
      newCartIDsUnfound.push(cartIndex);

      setCartIDs(newCartIDsUnfound);

      let itemInsert = {
        id: parseInt(e.target.parentElement.childNodes[0].childNodes[0].data),
        name: e.target.parentElement.childNodes[1].childNodes[0].data,
        price: e.target.parentElement.childNodes[2].childNodes[0].data,
        quantity: e.target.parentElement.childNodes[3].childNodes[0].data,
        total: e.target.parentElement.childNodes[4].childNodes[0].data,
      };

      let newCartUnfound = cart;
      newCartUnfound.push(itemInsert);
      setCart(newCartUnfound);
      setCount(cart.length);
    } else {
      let findIndex = cartIDs.indexOf(cartIndex);
      let newCartIDs = cartIDs;
      newCartIDs.splice(findIndex, 1);
      setCartIDs(newCartIDs);

      let newCartFound = cart;
      newCartFound.splice(findIndex, 1);
      setCart(newCartFound);

      let insertItemFound = {
        id: parseInt(e.target.parentElement.childNodes[0].childNodes[0].data),
        name: e.target.parentElement.childNodes[1].childNodes[0].data,
        price: e.target.parentElement.childNodes[2].childNodes[0].data,
        quantity: e.target.parentElement.childNodes[3].childNodes[0].data,
        total: e.target.parentElement.childNodes[4].childNodes[0].data,
      };

      let secondNewCart = cart;
      secondNewCart.push(insertItemFound);
      setCart(secondNewCart);

      let secondNewCartIDs = cartIDs;
      secondNewCartIDs.push(
        parseInt(e.target.parentElement.childNodes[0].childNodes[0].data)
      );
      setCartIDs(secondNewCartIDs);
      setCount(cart.length);
    }
  };

  if (loading) return <h1>This Page Is Loading...</h1>;

  return (
    <div className={style.container}>
      <h1>This Is The Shopping Page</h1>
      <div className={style.navBar}>
        <NavigationBar type={"shopping"} orderCount={count} />
      </div>
      <div className={style.itemsContainer}>
        {products.map((product) => {
          return (
            <div className={style.items} key={product.id}>
              <div>
                <h3>{product.title}</h3>
              </div>
              <div>{product.description}</div>
              <div>{product.category}</div>
              <div className={style.centerImage}>
                <img
                  className={style.imageDimensions}
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div>
                {"Price: "}
                {"$" + product.price}
              </div>
              <div>
                <span hidden={true}>{product.id}</span>
                <label>Enter Quantity</label>
                <input onChange={handleQuantityChange} type="number" />
                <button onClick={handleQuantityIncrease}>
                  Increase Quantiy
                </button>
                <button onClick={handleQuantityDecrease}>
                  Decrease Quantity
                </button>
              </div>
              <div>
                <label>
                  Quantity
                  <input
                    type="number"
                    value={quantity[product.id - 1]["quantity"]}
                    disabled={true}
                  />
                </label>
              </div>
              <div>
                <label>
                  Total Price
                  <input
                    disabled={true}
                    type="number"
                    value={product.price * quantity[product.id - 1]["quantity"]}
                  />
                </label>
              </div>
              <div>
                <span hidden={true}>{product.id}</span>
                <span hidden={true}>{product.title}</span>
                <span hidden={true}>{product.price}</span>
                <span hidden={true}>
                  {quantity[product.id - 1]["quantity"]}
                </span>
                <span hidden={true}>
                  {product.price * quantity[product.id - 1]["quantity"]}
                </span>
                <button onClick={handleAddToCart}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Outlet
          context={[cart, setCart, cartIDs, setCartIDs, count, setCount]}
        />
      </div>
    </div>
  );
}

export default ShoppingPage;
