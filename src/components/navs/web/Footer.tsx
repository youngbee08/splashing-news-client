import { Link } from "react-router-dom";
import { usePostContext } from "../../../hooks/UsePostContext";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const { categories } = usePostContext();

  const currentYear = new Date().getFullYear();

  const basePages = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
  ];

  const mainPages =
    Array.isArray(categories) && categories.length > 0
      ? categories
          .slice(0, 2)
          .filter((cat) => cat.isActive !== false)
          .map((cat) => ({
            name: cat.name,
            path: `/articles/${cat.slug || cat.name.toLowerCase()}`,
          }))
      : [];

  const webPages = [...basePages, ...mainPages];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-14 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="font-heading font-black text-2xl tracking-tight inline-flex items-center hover:opacity-90 transition-opacity"
            >
              <span className="text-white">Splashing</span>
              <span className="text-[#dc2626] ml-1.5">News</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Unbiased editorial reporting, breaking headlines, and in-depth
              coverage across Politics, Business, Health, and Sports.
            </p>
          </div>

          <div>
            <h4 className="text-white! text-xs font-bold uppercase tracking-wider mb-4 font-heading border-l-2 border-[#dc2626] pl-2.5">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {webPages.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>© {currentYear} Splashing News. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
