import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiMail,
  FiArrowUpRight,
  FiLock,
  FiHelpCircle,
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
  { id: "contact", title: "12. Contact Legal Department" },
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
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Breadcrumb Header */}
      <div className="border-b border-neutral-200 pb-6">
        <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-3">
          <Link to="/" className="hover:text-[#dc2626] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-400">Legal</span>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">Terms & Conditions</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#dc2626] text-xs font-semibold uppercase tracking-wider mb-3">
              <FiFileText className="w-3.5 h-3.5" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-neutral-900 tracking-tight">
              Terms & Conditions
            </h1>
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mt-2">
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-neutral-400" />
                Last Updated: July 24, 2026
              </span>
              <span>•</span>
              <span>Version 1.2</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs"
            >
              {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FiCopy className="w-3.5 h-3.5 text-neutral-500" />}
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
      </div>

      {/* Summary Highlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiShield className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Content Protection</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            All news articles, media, and editorial content are protected by copyright law.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiCheckCircle className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Fair Usage</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Personal reading is permitted. Systematic scraping or distribution requires prior authorization.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiLock className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">User Responsibility</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Users must maintain courteous interactions and refrain from unlawful or abusive behavior.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiAlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Editorial Disclaimer</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Reports are provided for informational purposes. Verify financial or medical advice independently.
          </p>
        </div>
      </div>

      {/* Main Content & Table of Contents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Table of Contents */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white border border-neutral-200 p-5 rounded-2xl shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
              Table of Contents
            </h2>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full text-left text-xs font-medium text-neutral-600 hover:text-[#dc2626] hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-all flex items-center justify-between group"
                >
                  <span>{sec.title}</span>
                  <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#dc2626] transition-opacity" />
                </button>
              ))}
            </nav>
            <div className="pt-3 border-t border-neutral-100">
              <Link
                to="/privacy-policy"
                className="text-xs font-semibold text-[#dc2626] hover:underline flex items-center justify-between"
              >
                <span>Read Privacy Policy</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="lg:col-span-8 space-y-10 text-neutral-700 text-sm leading-relaxed">
          {/* Important Callout */}
          <div className="bg-red-50/70 border-l-4 border-[#dc2626] p-4 sm:p-5 rounded-r-xl space-y-2">
            <div className="flex items-center gap-2 text-[#dc2626] font-heading font-bold text-sm">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>Important Notice to Readers & Visitors</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              By accessing, browsing, or utilizing Splashing News ("the Platform", "we", "us", or "our"), you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our site immediately.
            </p>
          </div>

          {/* Section 1 */}
          <section id="acceptance" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">1.</span> Acceptance of Terms
            </h2>
            <p>
              These Terms and Conditions govern your access to and use of Splashing News, including all published articles, multimedia content, newsletters, mobile interfaces, and related services.
            </p>
            <p>
              By accessing any section of the website or subscribing to our newsletters, you acknowledge that you enter into a legally binding agreement with Splashing News. We reserve the right to revise these Terms at any time without prior individual notice.
            </p>
          </section>

          {/* Section 2 */}
          <section id="intellectual-property" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">2.</span> Intellectual Property Rights
            </h2>
            <p>
              All original content featured on Splashing News—including but not limited to articles, investigative reports, editorial opinions, photographs, graphics, logos, audio clips, and software code—is the exclusive property of Splashing News or its content licensors and is protected under international copyright, trademark, and intellectual property laws.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-2 text-xs">
              <p className="font-semibold text-neutral-900">Permissions & Restrictions:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>You may read, bookmark, and share links to our published articles for personal, non-commercial use.</li>
                <li>You may quote brief excerpts provided that clear attribution is given to Splashing News with a direct hyperlink to the original source.</li>
                <li>You may not republish, sell, modify, or scrape complete articles or images without explicit written consent from Splashing News management.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="acceptable-use" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">3.</span> Acceptable Use & Conduct
            </h2>
            <p>
              You agree to use Splashing News only for lawful purposes. You are strictly prohibited from engaged in activities that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>Violate any local, national, or international laws or regulations.</li>
              <li>Attempt to gain unauthorized access to our content management systems, servers, or user databases.</li>
              <li>Introduce malicious viruses, trojans, worms, or automated scraping scripts (crawlers) that overburden site performance.</li>
              <li>Impersonate Splashing News journalists, staff members, or other readers.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="editorial-disclaimer" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">4.</span> Editorial Content & Accuracy
            </h2>
            <p>
              Splashing News strives for journalistic integrity, accuracy, and fairness in all reported stories. However, news develops rapidly and information is subject to change.
            </p>
            <p>
              Articles provided under categories such as Business, Politics, Health, and Technology are intended solely for general informational and educational purposes. Content should not be relied upon as professional legal, financial, or medical advice.
            </p>
          </section>

          {/* Section 5 */}
          <section id="user-contributions" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">5.</span> User Comments & Submissions
            </h2>
            <p>
              If you submit comments, feedback, opinion pieces, or news tips through our platform, you grant Splashing News a non-exclusive, royalty-free, perpetual right to publish, review, edit, or reproduce your contribution across our media channels.
            </p>
            <p>
              We reserve the right, but assume no obligation, to monitor, edit, or delete user-submitted content that contains hate speech, defamation, spam, or abusive language.
            </p>
          </section>

          {/* Section 6 */}
          <section id="third-party" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">6.</span> External Links & Third-Party Services
            </h2>
            <p>
              Our news coverage may contain links to external third-party websites, reference sources, or advertiser platforms. Splashing News does not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          {/* Section 7 */}
          <section id="accounts" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">7.</span> Account Security & Newsletters
            </h2>
            <p>
              Authorized editors and staff accessing the CMS portal must maintain confidential login credentials. You are responsible for all activities occurring under your administrative account.
            </p>
            <p>
              Subscribers to our email digests may unsubscribe at any time using the one-click opt-out link provided in every newsletter footer.
            </p>
          </section>

          {/* Section 8 */}
          <section id="limitation" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">8.</span> Limitation of Liability & Warranties
            </h2>
            <p>
              Splashing News is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not guarantee uninterrupted access, server uptime, or error-free site operation.
            </p>
            <p>
              In no event shall Splashing News, its directors, editors, or employees be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use our services.
            </p>
          </section>

          {/* Section 9 */}
          <section id="indemnification" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">9.</span> User Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Splashing News and its affiliates against any claims, liabilities, damages, losses, or legal costs arising out of your violation of these Terms or misuse of the Platform.
            </p>
          </section>

          {/* Section 10 */}
          <section id="governing-law" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">10.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without giving effect to any principles of conflicts of law. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts.
            </p>
          </section>

          {/* Section 11 */}
          <section id="changes" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">11.</span> Modifications to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at our discretion. The "Last Updated" timestamp at the top of this document will reflect the date of the latest revisions. Continued use of Splashing News following posted changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Section 12 / Contact Card */}
          <section id="contact" className="space-y-4 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">12.</span> Contact Legal Department
            </h2>
            <p>
              If you have questions, copyright notices, or legal inquiries regarding these Terms and Conditions, please contact our legal desk:
            </p>

            <div className="bg-neutral-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#dc2626] flex items-center justify-center">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">Splashing News Legal Office</h4>
                  <p className="text-xs text-neutral-400">Editorial & Copyright Legal Inquiries</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-neutral-800 text-neutral-300">
                <div>
                  <span className="text-neutral-500 block">Email:</span>
                  <a href="mailto:legal@splashingnews.com" className="text-white hover:text-[#dc2626] font-medium transition-colors">
                    legal@splashingnews.com
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block">Address:</span>
                  <span>100 Media Plaza, Press District, NY 10001</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <FiHelpCircle className="w-4 h-4" />
                  <span>Review Privacy Policy</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
