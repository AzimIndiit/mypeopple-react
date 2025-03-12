const GetModalContent = (data: any) => {
    switch (data.orderStatus) {
      case "accepted":
        return {
          title: "Thanks for your confidence",
          showFooter: false,
          description: (
            <p>
              Hi Tran, your order{" "}
              <span className="text-[#0280F9]">n°452136</span>
              was accepted and is now under progress. Your HRBP will get back to
              you as shortly as possible. You can check status from your
              Dashboard.
            </p>
          ),
        };

      case "rejected":
        return {
          title: "We are here to help!",
          showFooter: true,
          description: (
            <p>
              Unfortunately, your order{" "}
              <span className="text-[#0280F9]">n°452136</span> was rejected You
              can place anytime a new order from your dashboard.
            </p>
          ),
        };

      case "sent":
      default:
        return {
          title: "Your trust warms our hearts!",
          showFooter: false,
          description: (
            <p>
              Hi Tran, thanks for your order{" "}
              <span className="text-[#0280F9]">n°452136</span>. Your request is
              under review. Your HRBP will get back to you as soon as possible.
            </p>
          ),
        };
    }
  };

  export default GetModalContent;