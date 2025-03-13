const GetModalContent = (data: any) => {
    switch (data.orderStatus) {
      case "accepted":
        return {
          title: "We can't wait to meet you",
          description: (
            <p>
              We confirm your appointment for Friday, December 5, 2024 from 2:00 to 2:30 p.m. We will
send you a reminder before the time of your appointment.

            </p>
          ),
        };

      case "rejected":
        return {
          title: "We can't wait to meet you",
          description: (
            <p>
             You've asked us to call you back and so we will within 24 hours.
             If necessary, please make sure your contact information is up to date.
            </p>
          ),
        };

      
    }
  };

  export default GetModalContent;