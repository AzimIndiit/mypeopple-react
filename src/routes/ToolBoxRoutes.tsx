import { lazy } from "react";
import { Route } from "react-router-dom";

const ToolBoxPage = lazy(() => import("@/pages/tool-box/Page"));

const ToolBoxRoutes = () => (
  <>
    <Route path="/tool-box" element={<ToolBoxPage />} />
  </>
);

export default ToolBoxRoutes;
