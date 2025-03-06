import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = () => {
//   const { t, i18n } = useTranslation();

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav>
          <ul>
            <li className="mt-4 text-gray-600 hover:text-gray-900">
              <a href="/dashboard">Home</a>
            </li>
            <li className="mt-2 text-gray-600 hover:text-gray-900">
              <a href="/dashboard/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
      <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;