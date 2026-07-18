import {
  FiFileText,
  FiEye,
  FiZap,
  FiMoreVertical,
  FiUploadCloud,
  FiBarChart2,
  FiMail,
  FiSliders,
} from "react-icons/fi";

const stats = [
  {
    label: "Total Posts",
    value: "1,284",
    changeType: "positive",
    icon: <FiFileText className="w-5 h-5 text-red-700" />,
    iconBg: "bg-red-50",
  },
  {
    label: "Page Views",
    value: "42.8k",
    changeType: "positive",
    icon: <FiEye className="w-5 h-5 text-[#0284c7]" />,
    iconBg: "bg-sky-50",
  },
  {
    label: "Activity Level",
    value: "92%",
    changeType: "warning",
    icon: <FiZap className="w-5 h-5 text-amber-600" />,
    iconBg: "bg-amber-50",
  },
];

const posts = [
  {
    id: 1,
    title: "National Health Reform: 2024 Policy Update",
    meta: "Edited by Maria S. • 12 mins ago",
    category: "Politics",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&q=80",
    isDraft: false,
  },
  {
    id: 2,
    title: "New Research Centers Announced in Eastern Provinces",
    meta: "Published by Leo K. • 2 hours ago",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=100&h=100&fit=crop&q=80",
    isDraft: false,
  },
  {
    id: 3,
    title: "Quarterly Economic Growth Exceeds Initial Projections",
    meta: "Drafted by Sarah W. • 5 hours ago",
    category: "Draft",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&q=80",
    isDraft: true,
  },
  {
    id: 4,
    title: "Infrastructure Bill: Final Senate Reading Scheduled",
    meta: "Edited by James L. • Yesterday",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=100&h=100&fit=crop&q=80",
    isDraft: false,
  },
];

const Overview = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="pb-6">
        <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">
          Overview
        </h1>
        <p className="text-xs text-neutral-500 font-medium mt-1">
          Good morning, Administrator. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-neutral-200/50 rounded-lg p-5 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.iconBg}`}>{stat.icon}</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-400 uppercase">
                {stat.label}
              </p>
              <p className="font-serif font-black text-2xl text-neutral-900 mt-0.5">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-neutral-200/50 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-black text-lg text-neutral-900">
                Recent Posts
              </h2>
              <a
                href="#"
                className="text-xs font-semibold text-[#b91c1c] hover:underline"
              >
                View Archive
              </a>
            </div>

            <div className="divide-y divide-neutral-200/60">
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover bg-neutral-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-900 truncate hover:text-[#b91c1c] cursor-pointer transition-colors duration-150">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-450 mt-1">{item.meta}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        item.isDraft
                          ? "bg-red-50 text-red-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {item.category}
                    </span>
                    <button className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors">
                      <FiMoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-neutral-200/50 rounded-lg p-5 shadow-xs">
            <h4 className="text-2xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] border border-neutral-150 hover:border-neutral-300 rounded-lg transition-all duration-200 group">
                <FiUploadCloud className="w-4.5 h-4.5 text-red-700 mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-2xs font-semibold text-neutral-700">
                  Import
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] border border-neutral-150 hover:border-neutral-300 rounded-lg transition-all duration-200 group">
                <FiBarChart2 className="w-4.5 h-4.5 text-red-700 mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-2xs font-semibold text-neutral-700">
                  Report
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] border border-neutral-150 hover:border-neutral-300 rounded-lg transition-all duration-200 group">
                <FiMail className="w-4.5 h-4.5 text-red-700 mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-2xs font-semibold text-neutral-700">
                  Newsletter
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] border border-neutral-150 hover:border-neutral-300 rounded-lg transition-all duration-200 group">
                <FiSliders className="w-4.5 h-4.5 text-red-700 mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-2xs font-semibold text-neutral-700">
                  Filters
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
