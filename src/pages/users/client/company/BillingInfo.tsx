
const billingData: any = {
  firstName: "Jabari",
  lastName: "Keita",
  status: "active",
  position: "CEO",
  enterpriseRegisteredNumber: "88765",
  companyName: "Tam",
  nafCode: "YHGYU76",
  vatIdNo: "Jabari",
  address: "965 Saint Joseph St, California, USA, 190055 ",
  email: "Jabari Keita@gmail.com",
  // phone:"+56 458456 6562"
};

const BillingInfo = () => {
  return (
    <div className="flex flex-wrap text-left items-start gap-4 w-full h-full bg-[#F8F8F8] p-[20px] rounded-[10px] font-primary ">
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Fist Name</p>
        <p className="text-[16px] font-medium">{billingData.firstName}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Fist Name</p>
        <p className="text-[16px] font-medium">{billingData.firstName}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Last Name</p>
        <p className="text-[16px] font-medium">{billingData.lastName}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Email Address</p>
        <p className="text-[16px] font-medium">{billingData.email}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Enterprise Registered Number</p>
        <p className="text-[16px] font-medium">
          {billingData.enterpriseRegisteredNumber}
        </p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Company Name</p>
        <p className="text-[16px] font-medium">{billingData.companyName}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">NAF Code</p>
        <p className="text-[16px] font-medium">{billingData.nafCode}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">VAT Id. Number</p>
        <p className="text-[16px] font-medium">{billingData.vatIdNo}</p>
      </div>
      <div className=" space-x-4 ">
        <p className="text-[16px] font-light text-[#596569]">Address</p>
        <p className="text-[16px] font-medium">{billingData.address}</p>
      </div>
    </div>
  );
};

export default BillingInfo;
