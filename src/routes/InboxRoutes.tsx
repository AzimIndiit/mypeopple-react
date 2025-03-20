import { lazy } from "react";
import { Route } from "react-router-dom";

const InboxPage = lazy(() => import("@/pages/inbox/Page"));
const InboxMessagePage = lazy(() => import("@/pages/inbox/InboxMessage"));

const InboxRoutes = () => (
  <>
    <Route path="/inbox" element={<InboxPage />} />
    <Route path="/inbox/:id" element={<InboxMessagePage />} />
  </>
);

export default InboxRoutes;
