import { lazy } from "react";
import { Route } from "react-router-dom";

const BillingPage = lazy(() => import("@/pages/billings/Page"));
const ReferralPage = lazy(() => import("@/pages/referral/Page"));

const BillingRoutes = () => (
  <>
    <Route path="/billings" element={<BillingPage />} />
    <Route path="/billings/referral" element={<ReferralPage />} />
  </>
);

export default BillingRoutes;
