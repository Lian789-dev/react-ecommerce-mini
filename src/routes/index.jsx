import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home";
import ProductDetailView from "../pages/product-detail-view";
import Catalog from "../pages/catalog";
import Checkout from "../pages/checkout";
import ShippingAddress from "../pages/shipping-address";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <ProductDetailView />,
      },
      { path: "/category/:categoryName", element: <Catalog /> },
      { path: "search", element: <Catalog /> },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/shipping-addresses",
    element: <ShippingAddress />,
  },
]);
