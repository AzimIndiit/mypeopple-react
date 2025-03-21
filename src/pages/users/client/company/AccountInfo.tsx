import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import locationIcon from "@/assets/icons/location-fill.svg";
import UserList from "@/components/Client/UserList";

const AccountInfo = ({ userData }: { userData: any }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-start items-center w-full my-4 gap-4 ">
      <div className="flex flex-col items-center gap-2 w-full  md:w-[380px] bg-[#F8F8F8] p-[10px] rounded-[10px]">
        <div className="flex flex-col gap-2 text-left  w-full ">
          <p className="text-[16px] font-semibold font-primary">
            {userData.name}{" "}
            <span className="font-light">(ERN : {userData.ern})</span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            VAT ID Number:{" "}
            <span className="font-light text-black">{userData.vatNo}</span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            Collective Bargaining Agreement:{" "}
            <span className="font-light  text-black">
              {userData.bargainingAgreement}
            </span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            NAF Code:{" "}
            <span className="font-light text-black"> {userData.nafCode}</span>
          </p>
          <hr className="my-4 w-full" />
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={locationIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.address}
          </p>
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={emailIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.email}
          </p>
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={phoneIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.phone}
          </p>
        </div>
        {/* <Button className="h-[40px]   w-full">
        {" "}
        <img
          src={connectIcon}
          alt="connect"
          className="w-[16px] h-[16px]"
        />{" "}
        Connect{" "}
      </Button> */}
      </div>
      <div className="w-full ">
        <p className=" text-[14px] lg:text-[14px] font-semibold font-primary w-full mb-4 uppercase text-[#1C1C1C]  ">
          Related Users
        </p>
        <UserList className="md:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4" />
      </div>
    </div>
  );
};

export default AccountInfo;
