import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Sections",
    links: [
      { name: "Politics & Policy", path: "/politics" },
      { name: "Global Economy", path: "/economy" },
      { name: "Public Health", path: "/health" },
      { name: "Tech Regulation", path: "/tech" },
      { name: "Infrastructure", path: "/infrastructure" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Open Data Portal", path: "/resources/data" },
      { name: "Budget Archives", path: "/resources/budget" },
      { name: "Public Records (FOIA)", path: "/resources/foia" },
      { name: "Legal Library", path: "/resources/legal" },
      { name: "Job Openings", path: "/resources/jobs" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Accessibility", path: "/accessibility" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Branding + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-heading font-black text-xl sm:text-2xl tracking-tight flex items-center hover:opacity-90 transition-opacity mb-4"
            >
              <span className="text-white">Splashing</span>
              <span className="text-[#dc2626] ml-1.5">News</span>
            </Link>
            <p className="text-neutral-450 text-sm leading-relaxed mb-6 max-w-sm">
              Authoritative reporting for civil servants, policy makers, and the
              public. Building trust through transparency and editorial
              excellence.
            </p>

            {/* Social / Globe Icons */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 border border-neutral-800 rounded-full text-neutral-500 hover:text-white hover:border-neutral-700 transition-all hover:bg-neutral-900"
                title="International Editions"
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 border border-neutral-800 rounded-full text-neutral-500 hover:text-white hover:border-neutral-700 transition-all hover:bg-neutral-900"
                title="Accessibility Directory"
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M11.01 19V19M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-heading">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-neutral-450 hover:text-white text-sm transition-colors duration-150 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Divider + Copyright + Status */}
        <div className="border-t border-neutral-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>© 2024 Splashing News. All rights reserved.</p>

          <div className="flex items-center gap-2 text-neutral-450">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Systems Operational</span>
            <span className="text-neutral-700">•</span>
            <span>Last updated 2 minutes ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
