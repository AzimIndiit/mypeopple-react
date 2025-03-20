import { lazy } from "react";
import { Route } from "react-router-dom";

const SubscriptionPage = lazy(() => import("@/pages/subscription/Page"));

const SubscriptionRoutes = () => (
  <>
    <Route path="/subscription" element={<SubscriptionPage />} />
  </>
);

export default SubscriptionRoutes;
