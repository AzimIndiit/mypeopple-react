import { useAuth } from "@/context/AuthContext";

import ChangePlanClient from "@/components/Settings/client/ChangePlan/ChangePlan";
import ChangePlanUser from "@/components/Settings/user/ChangePlan/ChangePlan";
const SubscriptionSettings = () => {
  const { user } = useAuth();
console.log('user', user)
  if (user.role === "hrbp") {
    return <ChangePlanClient />;
  }
  return <ChangePlanUser />;
};

export default SubscriptionSettings;
