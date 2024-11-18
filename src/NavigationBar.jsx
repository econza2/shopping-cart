import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";

function NavigationBar({ type, orderCount }) {
  return (
    <>
      {type === "home" ? (
        <div className={styles.nav}>
          <Link to="/">Home Page</Link>
          <Link to="/shopping-page">Shopping Page</Link>
        </div>
      ) : (
        <div className={styles.nav}>
          <Link to="/">Home Page</Link>
          <Link to="/shopping-page">Shopping Page</Link>
          <div className={styles.cartContainer}>
            <div className={styles.orderNumberCart}>
              <Icon path={mdiCartOutline} size={4} color={"green"} />
              <div className={styles.orderNumber}>{orderCount}</div>
            </div>
            <Link className={styles.checkOutLink} to="/shopping-page/checkout">
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

NavigationBar.propTypes = {
  type: PropTypes.string,
  orderCount: PropTypes.number,
};

export default NavigationBar;
