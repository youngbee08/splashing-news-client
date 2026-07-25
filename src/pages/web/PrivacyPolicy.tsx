import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
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
              Privacy Policy
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
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
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <FiPrinter className="w-3.5 h-3.5 text-neutral-500" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white border border-neutral-200 p-5 rounded-lg shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
              Privacy Topics
            </h2>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {privacySections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full text-left text-xs font-medium text-neutral-600 hover:text-[#dc2626] hover:bg-neutral-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
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
              <span>6 min read</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10 text-neutral-700 text-sm leading-relaxed">
          <section id="overview" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">1.</span> Overview & Data
              Controller
            </h2>
            <p>
              This Privacy Policy explains how Splashing News ("we", "our", or
              "us") collects, uses, protects, and discloses personal information
              when you visit our website, read our publication, or subscribe to
              our news digests.
            </p>
            <p>
              Splashing News serves as the primary Data Controller responsible
              for your personal information processed under this policy.
            </p>
          </section>

          <section id="data-collected" className="space-y-4 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">2.</span> Information We Collect
            </h2>
            <p>
              We collect information to deliver breaking news updates, maintain
              site performance, and improve editorial coverage.
            </p>

            <div className="overflow-x-auto rounded-lg border border-neutral-200">
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
                    <td className="p-3 font-semibold text-neutral-900">
                      Directly Provided
                    </td>
                    <td className="p-3">
                      Name, Email Address, News Comments, Contact inquiries
                    </td>
                    <td className="p-3">
                      Newsletter subscriptions, user support & editorial
                      feedback
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-900">
                      Automated Technical
                    </td>
                    <td className="p-3">
                      IP Address, browser type, device info, operating system
                    </td>
                    <td className="p-3">
                      Security monitoring, spam prevention, layout optimization
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-900">
                      Analytics Data
                    </td>
                    <td className="p-3">
                      Pageviews, article reading duration, referral URL
                    </td>
                    <td className="p-3">
                      Measuring reader interest and article performance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="data-usage" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">3.</span> How We Use Your
              Information
            </h2>
            <p>
              We process personal information based on the following legitimate
              operational grounds:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>
                <strong>Editorial Operations:</strong> Providing news content,
                breaking headlines, and category feeds.
              </li>
              <li>
                <strong>Communication:</strong> Sending editorial newsletters or
                administrative notifications to authorized personnel.
              </li>
              <li>
                <strong>Site Security:</strong> Protecting our servers against
                DDoS attacks, brute-force CMS attempts, and malicious bots.
              </li>
              <li>
                <strong>Legal Compliance:</strong> Fulfilling statutory
                obligations and responding to lawful legal requests.
              </li>
            </ul>
          </section>

          <section id="cookies" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">4.</span> Cookies & Tracking
              Technologies
            </h2>
            <p>
              Splashing News uses essential cookies and similar browser storage
              mechanisms to ensure core website functionality, remember reader
              preferences, and compile anonymized site traffic metrics.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-2 text-xs">
              <p className="font-semibold text-neutral-900">
                Cookie Categories:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>
                  <strong>Essential Cookies:</strong> Required for page
                  navigation and CMS authentication.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Collect aggregated data
                  on popular articles and load speeds.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Store reader settings
                  (such as layout choices or search queries).
                </li>
              </ul>
            </div>
          </section>

          <section id="ad-partners" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">5.</span> Third-Party Services &
              Ad Partners
            </h2>
            <p>
              We may utilize trusted third-party service providers for hosting,
              content delivery (CDN), fonts, and analytics. These providers
              access data only to perform specific tasks on our behalf under
              contractually binding confidentiality terms.
            </p>
          </section>

          <section id="data-sharing" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">6.</span> Data Sharing &
              Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade reader personal data. We disclose
              information only under the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>
                <strong>With your Consent:</strong> When you explicitly request
                or authorize us to share information.
              </li>
              <li>
                <strong>Service Providers:</strong> Cloud infrastructure
                partners bound by strict data processing agreements.
              </li>
              <li>
                <strong>Legal Necessity:</strong> If required by court subpoena,
                warrant, or mandatory regulatory mandate.
              </li>
            </ul>
          </section>

          <section id="data-security" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">7.</span> Data Retention &
              Security
            </h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfill the purposes outlined in this policy or comply with legal
              obligations.
            </p>
            <p>
              We implement industry-standard administrative, physical, and
              technical safeguards (such as HTTPS encryption and secure
              credential hashing) to protect against unauthorized data loss or
              breach.
            </p>
          </section>

          <section id="user-rights" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">8.</span> Your Privacy Rights
              (GDPR & CCPA)
            </h2>
            <p>
              Depending on your location, you hold specific statutory rights
              regarding your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-neutral-200 rounded-lg space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to Access
                </span>
                <p className="text-neutral-600">
                  Request a copy of personal information we maintain about you.
                </p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-lg space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to Erasure
                </span>
                <p className="text-neutral-600">
                  Request deletion of your newsletter or user records.
                </p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-lg space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Right to
                  Rectification
                </span>
                <p className="text-neutral-600">
                  Correct inaccurate or outdated contact information.
                </p>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-lg space-y-1">
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#dc2626]" /> Opt-Out Rights
                </span>
                <p className="text-neutral-600">
                  Unsubscribe instantly from marketing or newsletter digests.
                </p>
              </div>
            </div>
          </section>

          <section id="children" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">9.</span> Children's Online
              Privacy
            </h2>
            <p>
              Splashing News is directed at a general adult news audience. We do
              not knowingly collect or solicit personal information from
              children under 16 years of age. If we learn a minor's information
              was collected without parental consent, we promptly delete it.
            </p>
          </section>

          <section id="international" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">10.</span> International Data
              Transfers
            </h2>
            <p>
              As a news platform accessible globally, your information may be
              processed on servers located outside your country of residence. We
              enforce standard contractual clauses to safeguard cross-border
              transfers.
            </p>
          </section>

          <section id="policy-changes" className="space-y-3 pt-2 scroll-mt-28">
            <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2.5 border-b border-neutral-200 pb-2">
              <span className="text-[#dc2626]">11.</span> Updates to This
              Privacy Policy
            </h2>
            <p>
              We periodically update this policy to reflect editorial
              enhancements or regulatory changes. The "Last Updated" timestamp
              at the <strong>left bottom</strong> indicates when modifications
              take effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
