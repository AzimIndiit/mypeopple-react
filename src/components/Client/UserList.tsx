import UserCard from './UserCard';
import user1 from "@/assets/images/users/user-1.png";
import user2 from "@/assets/images/users/user-2.png";
import user3 from "@/assets/images/users/user-3.png";
import user4 from "@/assets/images/users/user-4.png";
import { cn } from '@/lib/utils';

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
  
const UserList = ({isDashboard,className}:{isDashboard?:boolean,className?:string}) => {
  return (  <div className={cn("grid grid-cols-1  md:grid-cols-3 xl:grid-cols-4 gap-2 my-4",className)}>
    {users.slice(0, isDashboard ? 4 : users.length).map((user) => (
      <UserCard key={user.id} {...user} />
    ))}
  </div>)
}

export default UserList