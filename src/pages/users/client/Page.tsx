

import Header from "@/components/Client/Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CompaniesTable from "@/components/Client/CompaniesTable";
import UserList from "@/components/Client/UserList";

const ClientsPage = ({
  showFilters,
  isDashboard,
}: {
  showFilters: boolean;
  isDashboard: boolean;
}) => {
  const location = useLocation();
  const [switchValue, setSwitchValue] = useState("users");
// console.log('location.pathname', location.pathname)
  // Update switchValue based on the route
  useEffect(() => {
    if (location.pathname.includes("/clients/companies")) {
      setSwitchValue("companies");
    } else {
      setSwitchValue("users");
    }
  }, [location.pathname]);
  
  return (
    <div className="w-full relative">
      {showFilters && (
        <div className="flex justify-between items-center w-full mb-4">
          <Header switchValue={switchValue}  />
        </div>
      )}

      {switchValue === "users" && (
        <>
          <div className="flex justify-between items-center w-full">
            <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
              My Clients
            </p>
            {isDashboard && (
              <Link
                to="/users"
                className="text-[12px] font-semibold font-primary w-full text-primary underline text-end "
              >
                View All
              </Link>
            )}
          </div>
           <UserList/>
        </>
      )}
      {switchValue === "companies" && (
        <>
          <div className="flex justify-between items-center w-full">
            <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
              Overview
            </p>
          </div>
          <div className="w-full my-4">
            <CompaniesTable />
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsPage;
