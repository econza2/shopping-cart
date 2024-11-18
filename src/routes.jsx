import CheckoutPage from "./CheckoutPage";
import HomePage from "./HomePage";
import ShoppingPage from "./ShopPage";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "shopping-page",
    element: <ShoppingPage />,
    children: [
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
];

export default routes;
