import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CheckoutPage } from './Checkout';
import { SuccessPage } from './Success';
import { FailPage } from './Fail';
import './style.css';

const router = createBrowserRouter([
  {
    path: "/sandbox",
    element: <CheckoutPage />,
  },
  {
    path: "/sandbox/success",
    element: <SuccessPage />,
  },
  {
    path: "/sandbox/fail",
    element: <FailPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);