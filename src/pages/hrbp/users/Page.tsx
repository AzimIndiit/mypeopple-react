import UserCard from "@/components/User/UserCard";
import user1 from "@/assets/images/users/user-1.png";
import user2 from "@/assets/images/users/user-2.png";
import user3 from "@/assets/images/users/user-3.png";
import user4 from "@/assets/images/users/user-4.png";
import Header from "@/components/User/Header";
import { Link } from "react-router-dom";
const users = [
  {
    id: 1,
    name: "John Doe",
    exp: "5 years",
    image: user1,
    status: "available",
  },
  {
    id: 2,
    name: "Jane Doe",
    exp: "3 years",
    image: user2,
    status: "offline",
  },
  {
    id: 3,
    name: "John Doe",
    exp: "5 years",
    image: user3,
    status: "unavailable",
  },
  {
    id: 4,
    name: "Jane Doe",
    exp: "3 years",
    image: user4,
    status: "available",
  },
  {
    id: 1,
    name: "John Doe",
    exp: "5 years",
    image: user1,
    status: "available",
  },
  {
    id: 2,
    name: "Jane Doe",
    exp: "3 years",
    image: user2,
    status: "offline",
  },
  {
    id: 3,
    name: "John Doe",
    exp: "5 years",
    image: user3,
    status: "unavailable",
  },
  {
    id: 4,
    name: "Jane Doe",
    exp: "3 years",
    image: user4,
    status: "available",
  },
];
const UsersPage = ({
  showFilters,
  isDashboard,
}: {
  showFilters: boolean;
  isDashboard: boolean;
}) => {
  return (
    <div className="w-full relative">
      {showFilters && (
        <div className="flex justify-between items-center w-full mb-4">
          <Header />
        </div>
      )}
      <div className="flex justify-between items-center w-full">
        <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
          My HRBP
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
      <div className="grid grid-cols-1  md:grid-cols-3 xl:grid-cols-4 gap-2 my-4">
        {users.slice(0, isDashboard ? 4 : users.length).map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
