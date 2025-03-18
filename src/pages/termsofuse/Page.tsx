import { PageHeader } from "@/components/PageHeader";

function TermsOfUsePage() {
  return (
    <div className="w-full">
      <PageHeader title="Terms of Use" />
      <div className="w-full my-4 font-primary text-[#414042] text-[16px]">
        <p>
          By accessing this web site, you are agreeing to be bound by these web
          site Terms and Conditions of Use, all applicable laws and regulations,
          and agree that you are responsible for compliance with any applicable
          local laws. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site. The materials contained
          in this web site are protected by applicable copyright and trade mark
          law.
        </p>
        <p className="font-bold text-[20px] my-4">Use License</p>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Mypeople's web site for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you may
          not:
          <ul className="list-[lower-alpha] list-inside my-2">
            <li> modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial);
            </li>
            <li>
              attempt to decompile or reverse engineer any software contained on
              Mypeople's web site;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>
              transfer the materials to another person or "mirror" the materials
              on any other server.
            </li>
          </ul>
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Mypeople at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </p>
        <p className="font-bold text-[20px] my-4">Disclaimer</p>
        <p>
          The materials on Mypeople's web site are provided "as is". Mypeople
          makes no warranties, expressed or implied, and hereby disclaims and
          negates all other warranties, including without limitation, implied
          warranties or conditions of merchantability, fitness for a particular
          purpose, or non-infringement of intellectual property or other
          violation of rights. Further, Mypeople does not warrant or make any
          representations concerning the accuracy, likely results, or
          reliability of the use of the materials on its Internet web site or
          otherwise relating to such materials or on any sites linked to this
          site.
        </p>
        <p className="font-bold text-[20px] my-4">Limitations</p>
        <p>
          In no event shall Mypeople or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption,) arising out of the use or inability to
          use the materials on Mypeople's Internet site, even if Mypeople or a
          Mypeople authorized representative has been notified orally or in
          writing of the possibility of such damage. Because some jurisdictions
          do not allow limitations on implied warranties, or limitations of
          liability for consequential or incidental damages, these limitations
          may not apply to you.
        </p>
        <p className="font-bold text-[20px] my-4">Revisions and Errata</p>
        <p>
          The materials appearing on Mypeople's web site could include
          technical, typographical, or photographic errors. Mypeople does not
          warrant that any of the materials on its web site are accurate,
          complete, or current. Mypeople may make changes to the materials
          contained on its web site at any time without notice. Mypeople does
          not, however, make any commitment to update the materials.
        </p>
        <p className="font-bold text-[20px] my-4">Links</p>
        <p>
          Mypeople has not reviewed all of the sites linked to its Internet web
          site and is not responsible for the contents of any such linked site.
          The inclusion of any link does not imply endorsement by Mypeople of
          the site. Use of any such linked web site is at the user's own risk.
        </p>
        <p className="font-bold text-[20px] my-4">
          Site Terms of Use Modifications
        </p>
        <p>
          Mypeople may revise these terms of use for its web site at any time
          without notice. By using this web site you are agreeing to be bound by
          the then current version of these Terms and Conditions of Use.
        </p>
        <p className="font-bold text-[20px] my-4">Governing Law</p>
        <p>
          Any claim relating to Mypeople's web site shall be governed by the
          laws of the State of USA without regard to its conflict of law
          provisions.
        </p>
        General Terms and Conditions applicable to Use of a Web Site.
      </div>
    </div>
  );
}

export default TermsOfUsePage;
