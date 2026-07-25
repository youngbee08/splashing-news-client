import { useState } from "react";
import {
  FiAlertTriangle,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiClock,
} from "react-icons/fi";
import { toast } from "sonner";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "intellectual-property", title: "2. Intellectual Property Rights" },
  { id: "acceptable-use", title: "3. Acceptable Use & Conduct" },
  { id: "editorial-disclaimer", title: "4. Editorial Content & Accuracy" },
  { id: "user-contributions", title: "5. User Comments & Contributions" },
  { id: "third-party", title: "6. External Links & Third-Party Services" },
  { id: "accounts", title: "7. Account Security & Newsletter" },
  { id: "limitation", title: "8. Limitation of Liability & Warranties" },
  { id: "indemnification", title: "9. User Indemnification" },
  { id: "governing-law", title: "10. Governing Law & Jurisdiction" },
  { id: "changes", title: "11. Modifications to Terms" },
];

const TermsAndConditions = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Page link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-neutral-900 tracking-tight">
              Terms & Conditions
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs"
            >
              {copied ? (
                <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <FiCopy className="w-3.5 h-3.5 text-neutral-500" />
              )}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs"
            >
              <FiPrinter className="w-3.5 h-3.5 text-neutral-500" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white border border-neutral-200 p-5 rounded-lg shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
              Table of Contents
            </h2>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full text-left text-xs font-medium text-neutral-600 hover:text-[#dc2626] hover:bg-neutral-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group"
                >
                  <span>{sec.title}</span>
                  <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#dc2626] transition-opacity" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mt-2">
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-neutral-400" />
                Last Updated: July 24, 2026
              </span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10 text-neutral-700 text-sm leading-relaxed">
          <div className="bg-red-50/70 border-l-4 border-[#dc2626] p-4 sm:p-5 rounded-r-lg space-y-2">
            <div className="flex items-center gap-2 text-[#dc2626] font-heading font-bold text-sm">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>Important Notice to Readers & Visitors</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              By accessing, browsing, or utilizing Splashing News ("the
              Platform", "we", "us", or "our"), you confirm that you have read,
              understood, and agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, please
              discontinue use of our site immediately.
            </p>
          </div>

          <section id="acceptance" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">1.</span> Acceptance of Terms
            </h2>
            <p>
              These Terms and Conditions govern your access to and use of
              Splashing News, including all published articles, multimedia
              content, newsletters, mobile interfaces, and related services.
            </p>
            <p>
              By accessing any section of the website or subscribing to our
              newsletters, you acknowledge that you enter into a legally binding
              agreement with Splashing News. We reserve the right to revise
              these Terms at any time without prior individual notice.
            </p>
          </section>

          <section
            id="intellectual-property"
            className="space-y-3 pt-2 scroll-mt-28"
          >
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">2.</span> Intellectual Property
              Rights
            </h2>
            <p>
              All original content featured on Splashing News—including but not
              limited to articles, investigative reports, editorial opinions,
              photographs, graphics, logos, audio clips, and software code—is
              the exclusive property of Splashing News or its content licensors
              and is protected under international copyright, trademark, and
              intellectual property laws.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-2 text-xs">
              <p className="font-semibold text-neutral-900">
                Permissions & Restrictions:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>
                  You may read, bookmark, and share links to our published
                  articles for personal, non-commercial use.
                </li>
                <li>
                  You may quote brief excerpts provided that clear attribution
                  is given to Splashing News with a direct hyperlink to the
                  original source.
                </li>
                <li>
                  You may not republish, sell, modify, or scrape complete
                  articles or images without explicit written consent from
                  Splashing News management.
                </li>
              </ul>
            </div>
          </section>

          <section id="acceptable-use" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">3.</span> Acceptable Use &
              Conduct
            </h2>
            <p>
              You agree to use Splashing News only for lawful purposes. You are
              strictly prohibited from engaged in activities that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>
                Violate any local, national, or international laws or
                regulations.
              </li>
              <li>
                Attempt to gain unauthorized access to our content management
                systems, servers, or user databases.
              </li>
              <li>
                Introduce malicious viruses, trojans, worms, or automated
                scraping scripts (crawlers) that overburden site performance.
              </li>
              <li>
                Impersonate Splashing News journalists, staff members, or other
                readers.
              </li>
            </ul>
          </section>

          <section
            id="editorial-disclaimer"
            className="space-y-3 pt-2 scroll-mt-28"
          >
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">4.</span> Editorial Content &
              Accuracy
            </h2>
            <p>
              Splashing News strives for journalistic integrity, accuracy, and
              fairness in all reported stories. However, news develops rapidly
              and information is subject to change.
            </p>
            <p>
              Articles provided under categories such as Business, Politics,
              Health, and Technology are intended solely for general
              informational and educational purposes. Content should not be
              relied upon as professional legal, financial, or medical advice.
            </p>
          </section>

          <section
            id="user-contributions"
            className="space-y-3 pt-2 scroll-mt-28"
          >
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">5.</span> User Comments &
              Submissions
            </h2>
            <p>
              If you submit comments, feedback, opinion pieces, or news tips
              through our platform, you grant Splashing News a non-exclusive,
              royalty-free, perpetual right to publish, review, edit, or
              reproduce your contribution across our media channels.
            </p>
            <p>
              We reserve the right, but assume no obligation, to monitor, edit,
              or delete user-submitted content that contains hate speech,
              defamation, spam, or abusive language.
            </p>
          </section>

          <section id="third-party" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">6.</span> External Links &
              Third-Party Services
            </h2>
            <p>
              Our news coverage may contain links to external third-party
              websites, reference sources, or advertiser platforms. Splashing
              News does not control, endorse, or assume responsibility for the
              content, privacy policies, or practices of any third-party
              websites.
            </p>
          </section>

          <section id="accounts" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">7.</span> Account Security &
              Newsletters
            </h2>
            <p>
              Authorized editors and staff accessing the CMS portal must
              maintain confidential login credentials. You are responsible for
              all activities occurring under your administrative account.
            </p>
            <p>
              Subscribers to our email digests may unsubscribe at any time using
              the one-click opt-out link provided in every newsletter footer.
            </p>
          </section>

          <section id="limitation" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">8.</span> Limitation of Liability
              & Warranties
            </h2>
            <p>
              Splashing News is provided on an "as is" and "as available" basis
              without warranties of any kind, whether express or implied. We do
              not guarantee uninterrupted access, server uptime, or error-free
              site operation.
            </p>
            <p>
              In no event shall Splashing News, its directors, editors, or
              employees be liable for any direct, indirect, incidental, or
              consequential damages resulting from your use of or inability to
              use our services.
            </p>
          </section>

          <section id="indemnification" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">9.</span> User Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Splashing News
              and its affiliates against any claims, liabilities, damages,
              losses, or legal costs arising out of your violation of these
              Terms or misuse of the Platform.
            </p>
          </section>

          <section id="governing-law" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">10.</span> Governing Law &
              Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of the applicable jurisdiction, without
              giving effect to any principles of conflicts of law. Any disputes
              arising hereunder shall be subject to the exclusive jurisdiction
              of the competent courts.
            </p>
          </section>

          <section id="changes" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">11.</span> Modifications to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at our
              discretion. The "Last Updated" timestamp at the{" "}
              <strong>left bottom</strong> of this document will reflect the
              date of the latest revisions. Continued use of Splashing News
              following posted changes constitutes acceptance of the updated
              terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
