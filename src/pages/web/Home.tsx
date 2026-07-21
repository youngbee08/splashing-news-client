import { Link } from "react-router-dom";
import HeroCard from "../../components/cards/HeroCard";
import SubHeroCard from "../../components/cards/SubHeroCard";
import LatestNewsCard from "../../components/cards/LatestNewsCard";
import PoliticsCard from "../../components/cards/PoliticsCard";
import { usePostContext } from "../../hooks/UsePostContext";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import type { Post } from "../../types/generalTypes";

const Home = () => {
  const { postsData, isPostsLoading } = usePostContext();

  if (isPostsLoading) {
    return (
      <div className="space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <CardSkeleton variant="hero" />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <CardSkeleton variant="sub-hero" />
            <CardSkeleton variant="sub-hero" />
            <CardSkeleton variant="sub-hero" />
            <CardSkeleton variant="sub-hero" />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
              <h2 className="text-2xl font-heading font-extrabold text-neutral-900 tracking-tight">
                Latest News
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSkeleton variant="latest" />
              <CardSkeleton variant="latest" />
              <CardSkeleton variant="latest" />
              <CardSkeleton variant="latest" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="h-64 bg-neutral-100 rounded-lg animate-pulse" />
          </div>
        </section>
      </div>
    );
  }

  const posts: Post[] = Array.isArray(postsData?.data) ? postsData.data : [];

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-xl">
        <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
          No Articles Available
        </h2>
        <p className="text-neutral-500 text-sm">
          Check back later for news articles and updates.
        </p>
      </div>
    );
  }

  const hero = posts[0];
  const subHeroList = posts.length > 1 ? posts.slice(1, 5) : [];
  const latestList = posts.length > 5 ? posts.slice(5, 11) : posts.slice(1);

  const politicsList = posts
    .filter((p) => {
      const catSlug =
        typeof p.category === "object" ? p.category?.slug : p.category;
      const catName =
        typeof p.category === "object"
          ? p.category?.name?.toLowerCase()
          : String(p.category || "").toLowerCase();
      return catSlug === "politics" || catName === "politics";
    })
    .slice(0, 3);

  const trendingArticles = posts.slice(0, 5).map((p, index) => ({
    id: `0${index + 1}`,
    category:
      typeof p.category === "object"
        ? p.category?.name || "General"
        : String(p.category || "General"),
    title: p.title,
    slug: p.slug,
  }));

  return (
    <div className="space-y-16">
      <section className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0">
        <div className="lg:col-span-7 xl:col-span-8">
          <HeroCard post={hero} />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {subHeroList.map((article) => (
            <SubHeroCard key={article._id} post={article} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 tracking-tight">
              Latest News
            </h2>
            <Link
              to="/news"
              className="text-[#dc2626] hover:text-[#b91c1c] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            >
              Explore All
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestList.map((article) => (
              <LatestNewsCard key={article._id} post={article} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="border border-red-100/70 bg-red-50/5 rounded-lg p-5">
            <h3 className="text-base font-heading font-extrabold text-neutral-900 flex items-center gap-2 mb-5 border-b border-red-50 pb-2">
              <svg
                className="h-5 w-5 text-[#dc2626]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Trending
            </h3>

            <div className="space-y-4">
              {trendingArticles.map((article, index) => (
                <Link
                  key={index}
                  to={`/post/${article.slug}`}
                  className="flex gap-4 group cursor-pointer border-b border-neutral-100 last:border-0 pb-4 last:pb-0 block"
                >
                  <span className="font-heading font-extrabold text-2xl text-red-100 group-hover:text-red-200 transition-colors leading-none">
                    {article.id}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">
                      {article.category}
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 leading-snug group-hover:text-[#dc2626] transition-colors">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-red-50/15 border border-red-150/40 rounded-lg p-6">
            <h3 className="font-heading font-black text-lg text-neutral-900 mb-2">
              Splashingnews Morning Brief
            </h3>
            <p className="text-neutral-600 text-xs leading-relaxed mb-4">
              The essential splashing news delivered to your inbox every morning
              at 7:00 AM.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-3 py-2 bg-white border border-neutral-250 rounded-md text-xs font-medium text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400/20 transition-all shadow-xs"
              />
              <button
                type="submit"
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold py-2.5 rounded-md transition-colors shadow-sm"
              >
                Subscribe Now
              </button>
            </form>
            <span className="text-[10px] text-neutral-450 font-medium text-center block mt-3">
              Join 125,000+ professionals and policy makers.
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <h2 className="text-2xl font-heading font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
            <span className="block h-6 w-1 bg-[#dc2626]"></span>
            Politics
          </h2>
          <Link
            to="/articles/politics"
            className="border border-neutral-250 hover:bg-neutral-50 text-neutral-700 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-md transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {politicsList.map((article) => (
            <PoliticsCard key={article._id} post={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
