import { lazy } from "react";
import { Route } from "react-router-dom";

const OrdersPage = lazy(() => import("@/pages/orders/Page"));
const OrderCreatePage = lazy(() => import("@/pages/orders/OrderCreate"));
const OrderDetailsPage = lazy(() => import("@/pages/orders/OrderDetails"));
const OrderDetailsInboxPage = lazy(() => import("@/pages/orders/OrderDetailsInbox"));

const OrderRoutes = () => (
  <>
    <Route path="/orders" element={<OrdersPage showFilters />} />
    <Route path="/orders/create" element={<OrderCreatePage />} />
    <Route path="/orders/:id" element={<OrderDetailsPage />} />
    <Route path="/orders/inbox/:id" element={<OrderDetailsInboxPage />} />
  </>
);

export default OrderRoutes;
