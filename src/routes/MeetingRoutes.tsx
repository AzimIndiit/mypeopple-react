import { lazy } from "react";
import { Route } from "react-router-dom";

const MeetingPage = lazy(() => import("@/pages/meetings/Page"));

const MeetingRoutes = () => <Route path="/meeting" element={<MeetingPage />} />;

export default MeetingRoutes;
