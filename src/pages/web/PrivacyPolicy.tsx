import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiUserCheck,
  FiGlobe,
  FiCheckCircle,
  FiClock,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiMail,
  FiArrowUpRight,
  FiHelpCircle,
  FiFileText,
} from "react-icons/fi";
import { toast } from "sonner";

const privacySections = [
  { id: "overview", title: "1. Overview & Controller" },
  { id: "data-collected", title: "2. Information We Collect" },
  { id: "data-usage", title: "3. How We Use Your Data" },
  { id: "cookies", title: "4. Cookies & Analytics" },
  { id: "ad-partners", title: "5. Third-Party Services & Ads" },
  { id: "data-sharing", title: "6. Data Sharing & Disclosure" },
  { id: "data-security", title: "7. Data Retention & Security" },
  { id: "user-rights", title: "8. Your Rights (GDPR & CCPA)" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "international", title: "10. International Transfers" },
  { id: "policy-changes", title: "11. Updates to This Policy" },
  { id: "dpo-contact", title: "12. Contact Data Officer" },
];

const PrivacyPolicy = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Privacy Policy link copied");
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
          <span className="text-neutral-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#dc2626] text-xs font-semibold uppercase tracking-wider mb-3">
              <FiShield className="w-3.5 h-3.5" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-neutral-900 tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mt-2">
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-neutral-400" />
                Last Updated: July 24, 2026
              </span>
              <span>•</span>
              <span>GDPR & CCPA Compliant</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FiCopy className="w-3.5 h-3.5 text-neutral-500" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <FiPrinter className="w-3.5 h-3.5 text-neutral-500" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Commitments Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiLock className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Zero Data Broker Sales</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            We never sell, rent, or trade reader personal information to third-party data brokers.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiEye className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Full Transparency</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Clear insights into what technical data is processed during your visit.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiUserCheck className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Reader Control</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Manage your newsletter preferences and cookie settings at any time.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center mb-3">
            <FiGlobe className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">Global Compliance</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Structured in compliance with GDPR, CCPA/CPRA, and international privacy laws.
          </p>
        </div>
      </div>

      {/* Main Grid Content & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Sticky Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white border border-neutral-200 p-5 rounded-2xl shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
              Privacy Topics
            </h2>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {privacySections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full text-left text-xs font-medium text-neutral-600 hover:text-[#dc2626] hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{sec.title}</span>
                  <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#dc2626] transition-opacity" />
                </button>
              ))}
            </nav>
            <div className="pt-3 border-t border-neutral-100">
              <Link
                to="/terms-and-conditions"
                className="text-xs font-semibold text-[#dc2626] hover:underline flex items-center justify-between"
              >
                <span>Read Terms & Conditions</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="lg:col-span-8 space-y-10 text-neutral-700 text-sm leading-relaxed">
          {/* Executive Overview Notice */}
          <div className="bg-neutral-900 text-white p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
              <FiShield className="w-4 h-4 text-[#dc2626]" />
              <span>Our Privacy Commitment</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Splashing News believes independent journalism requires absolute reader trust. We handle all reader data with strict confidentiality, operating under principles of data minimization and security.
            </p>
          </div>

          {/* Section 1 */}
          <section id="overview" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">1.</span> Overview & Data Controller
            </h2>
            <p>
              This Privacy Policy explains how Splashing News ("we", "our", or "us") collects, uses, protects, and discloses personal information when you visit our website, read our publication, or subscribe to our news digests.
            </p>
            <p>
              Splashing News serves as the primary Data Controller responsible for your personal information processed under this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="data-collected" className="space-y-4 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">2.</span> Information We Collect
            </h2>
            <p>
              We collect information to deliver breaking news updates, maintain site performance, and improve editorial coverage.
            </p>

            <div className="overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 font-heading text-neutral-900 border-b border-neutral-200">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Data Elements</th>
                    <th className="p-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-600 bg-white">
                  <tr>
                    <td className="p-3 font-semibold text-neutral-900">Directly Provided</td>
                    <td className="p-3">Name, Email Address, News Comments, Contact inquiries</td>
                    <td className="p-3">Newsletter subscriptions, user support & editorial feedback</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-900">Automated Technical</td>
                    <td className="p-3">IP Address, browser type, device info, operating system</td>
                    <td className="p-3">Security monitoring, spam prevention, layout optimization</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-900">Analytics Data</td>
                    <td className="p-3">Pageviews, article reading duration, referral URL</td>
                    <td className="p-3">Measuring reader interest and article performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="data-usage" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">3.</span> How We Use Your Information
            </h2>
            <p>
              We process personal information based on the following legitimate operational grounds:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li><strong>Editorial Operations:</strong> Providing news content, breaking headlines, and category feeds.</li>
              <li><strong>Communication:</strong> Sending editorial newsletters or administrative notifications to authorized personnel.</li>
              <li><strong>Site Security:</strong> Protecting our servers against DDoS attacks, brute-force CMS attempts, and malicious bots.</li>
              <li><strong>Legal Compliance:</strong> Fulfilling statutory obligations and responding to lawful legal requests.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="cookies" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">4.</span> Cookies & Tracking Technologies
            </h2>
            <p>
              Splashing News uses essential cookies and similar browser storage mechanisms to ensure core website functionality, remember reader preferences, and compile anonymized site traffic metrics.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-2 text-xs">
              <p className="font-semibold text-neutral-900">Cookie Categories:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li><strong>Essential Cookies:</strong> Required for page navigation and CMS authentication.</li>
                <li><strong>Performance Cookies:</strong> Collect aggregated data on popular articles and load speeds.</li>
                <li><strong>Preference Cookies:</strong> Store reader settings (such as layout choices or search queries).</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="ad-partners" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">5.</span> Third-Party Services & Ad Partners
            </h2>
            <p>
              We may utilize trusted third-party service providers for hosting, content delivery (CDN), fonts, and analytics. These providers access data only to perform specific tasks on our behalf under contractually binding confidentiality terms.
            </p>
          </section>

          {/* Section 6 */}
          <section id="data-sharing" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">6.</span> Data Sharing & Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade reader personal data. We disclose information only under the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li><strong>With your Consent:</strong> When you explicitly request or authorize us to share information.</li>
              <li><strong>Service Providers:</strong> Cloud infrastructure partners bound by strict data processing agreements.</li>
              <li><strong>Legal Necessity:</strong> If required by court subpoena, warrant, or mandatory regulatory mandate.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="data-security" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">7.</span> Data Retention & Security
            </h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or comply with legal obligations.
            </p>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards (such as HTTPS encryption and secure credential hashing) to protect against unauthorized data loss or breach.
            </p>
          </section>

          {/* Section 8 */}
          <section id="user-rights" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">8.</span> Your Privacy Rights (GDPR & CCPA)
            </h2>
            <p>
              Depending on your location, you hold specific statutory rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to Access
                </span>
                <p className="text-neutral-600">Request a copy of personal information we maintain about you.</p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to Erasure
                </span>
                <p className="text-neutral-600">Request deletion of your newsletter or user records.</p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to Rectification
                </span>
                <p className="text-neutral-600">Correct inaccurate or outdated contact information.</p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Opt-Out Rights
                </span>
                <p className="text-neutral-600">Unsubscribe instantly from marketing or newsletter digests.</p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="children" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">9.</span> Children's Online Privacy
            </h2>
            <p>
              Splashing News is directed at a general adult news audience. We do not knowingly collect or solicit personal information from children under 16 years of age. If we learn a minor's information was collected without parental consent, we promptly delete it.
            </p>
          </section>

          {/* Section 10 */}
          <section id="international" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">10.</span> International Data Transfers
            </h2>
            <p>
              As a news platform accessible globally, your information may be processed on servers located outside your country of residence. We enforce standard contractual clauses to safeguard cross-border transfers.
            </p>
          </section>

          {/* Section 11 */}
          <section id="policy-changes" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">11.</span> Updates to This Privacy Policy
            </h2>
            <p>
              We periodically update this policy to reflect editorial enhancements or regulatory changes. The "Last Updated" timestamp at the header indicates when modifications take effect.
            </p>
          </section>

          {/* Section 12 / DPO Contact Card */}
          <section id="dpo-contact" className="space-y-4 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">12.</span> Contact Data Protection Officer (DPO)
            </h2>
            <p>
              To exercise your privacy rights or request information regarding data handling, reach out to our Data Protection Officer:
            </p>

            <div className="bg-neutral-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#dc2626] flex items-center justify-center">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">Data Protection Office</h4>
                  <p className="text-xs text-neutral-400">Splashing News Compliance & Privacy Bureau</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-neutral-800 text-neutral-300">
                <div>
                  <span className="text-neutral-500 block">DPO Email:</span>
                  <a href="mailto:privacy@splashingnews.com" className="text-white hover:text-[#dc2626] font-medium transition-colors">
                    privacy@splashingnews.com
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block">Office Hours:</span>
                  <span>Mon - Fri, 9:00 AM - 5:00 PM EST</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/terms-and-conditions"
                  className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>View Terms & Conditions</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
