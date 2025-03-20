import { lazy } from "react";
import { Route } from "react-router-dom";

const SettingsPage = lazy(() => import("@/pages/settings/Page"));
const MyPlans = lazy(() => import("@/components/Settings/MyPlans"));
const TransactionHistoryPage = lazy(() => import("@/components/Settings/TransactionHistoryTable"));
const SavedPaymentMethods = lazy(() => import("@/components/Settings/SavedPaymentMethods"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy/Page"));
const TermsOfUsePage = lazy(() => import("@/pages/termsofuse/Page"));
const ChangePlan = lazy(() => import("@/components/Settings/ChangePlan/ChangePlan"));

const SettingsRoutes = () => (
  <>
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/settings/:id" element={<SettingsPage />} />
    <Route path="/settings/my-plans" element={<MyPlans />} />
    <Route path="/settings/saved-payment-methods" element={<SavedPaymentMethods />} />
    <Route path="/settings/change-plan" element={<ChangePlan />} />
    <Route path="/settings/transaction-history/:id" element={<TransactionHistoryPage />} />
    <Route path="/settings/privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="/settings/terms-of-use" element={<TermsOfUsePage />} />
  </>
);

export default SettingsRoutes;
