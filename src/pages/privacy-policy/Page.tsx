import { PageHeader } from '@/components/PageHeader'
import { useNavigate } from 'react-router-dom';
function PrivacyPolicyPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
        <PageHeader title="Privacy Policy" onBack={() => navigate(-1)} />
        <div className="w-full my-4 font-primary text-[#414042] text-[16px]">
          <p>
          Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
Before or at the time of collecting personal information, we will identify the purposes for which information is being collected. <br />
We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law. <br />
We will only retain personal information as long as necessary for the fulfillment of those purposes. <br />
We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned. <br />
Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification. <br />
We will make readily available to customers information about our policies and practices relating to the management of personal information. <br />
We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
</p>
<p className=" my-4">
Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
Before or at the time of collecting personal information, we will identify the purposes for which information is being collected. <br />
We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law. <br />
We will only retain personal information as long as necessary for the fulfillment of those purposes. <br />
We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned. <br />
Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification. <br />
We will make readily available to customers information about our policies and practices relating to the management of personal information. <br />
We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
          </p>
        </div>
    </div>
  )
}

export default PrivacyPolicyPage