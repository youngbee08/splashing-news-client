import type { Category, Post, TrendingArticle } from "./types/generalTypes";

export const headlines: string[] = [
  "New trade policy approved by Senate committee",
  "Department of Health announces nationwide initiative",
  "Quarterly economic growth exceeds projections",
  "International climate summit reaches landmark agreement",
  "Federal reserve hints at interest rate stabilization",
  "New infrastructure bill includes coastal rail expansion",
  "Cybersecurity task force to implement new standards",
];

// Categories definitions
const politicsCategory: Category = {
  _id: "cat-politics",
  name: "Politics",
  slug: "politics",
  description: "Political news, legislation, and updates.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const businessCategory: Category = {
  _id: "cat-business",
  name: "Business",
  slug: "business",
  description: "Financial markets, economics, and commerce.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const healthCategory: Category = {
  _id: "cat-health",
  name: "Health",
  slug: "health",
  description: "Public health, research, and medical updates.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const environmentCategory: Category = {
  _id: "cat-environment",
  name: "Environment",
  slug: "environment",
  description: "Climate change, conservation, and green energy.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const transitCategory: Category = {
  _id: "cat-transit",
  name: "Transit",
  slug: "transit",
  description: "Infrastructure, transportation, and public works.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const diplomacyCategory: Category = {
  _id: "cat-diplomacy",
  name: "Diplomacy",
  slug: "diplomacy",
  description: "International relations, summits, and foreign policy.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const educationCategory: Category = {
  _id: "cat-education",
  name: "Education",
  slug: "education",
  description: "Academic updates, educational policies, and literacy.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const technologyCategory: Category = {
  _id: "cat-technology",
  name: "Technology",
  slug: "technology",
  description: "Cybersecurity, tech regulation, and innovation.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const communitiesCategory: Category = {
  _id: "cat-communities",
  name: "Communities",
  slug: "communities",
  description: "Urban development, parks, and local initiatives.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

const sportsCategory: Category = {
  _id: "cat-sports",
  name: "Sports",
  slug: "sports",
  description: "Sports updates, tournament coverage, and profiles.",
  isActive: true,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
};

// Posts definitions
export const heroArticle: Post = {
  _id: "post-hero-1",
  title: "Historic Reform Bill Navigates Final Senate Vote Amid Growing Consensus",
  slug: "historic-reform-bill-navigates-final-senate-vote",
  excerpt: "Bipartisan efforts lead to a landmark decision that could reshape national infrastructure and public funding for the next decade.",
  content: `In a landmark decision that is set to reshape national infrastructure for the next generation, the Senate has passed the Historic Reform Bill with a solid bipartisan majority. The final vote concluded months of negotiations, during which lawmakers from both sides of the aisle debated funding caps, state-level allocations, and environmental compliance standards.

The bill allocates over $1.2 trillion toward repairing aging highways, expanding transit routes, upgrading public water grids, and investing in renewable power grids. Senators supporting the bill highlighted its potential to create hundreds of thousands of jobs and boost economic competitiveness over the next ten years.

Critics of the bill raised concerns about its overall impact on the national debt and called for stricter oversight on how the funds are distributed. However, last-minute compromises regarding compliance audits and localized project prioritization helped secure the remaining votes needed for passage. The legislation now heads to the executive office for signature.`,
  featuredImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  category: politicsCategory,
  author: "Sarah Jenkins",
  status: "published",
  views: 1420,
  readingTime: "12 min read",
  isFeatured: true,
  publishedAt: "2026-07-13T08:00:00Z",
  createdAt: "2026-07-13T08:00:00Z",
  updatedAt: "2026-07-13T08:00:00Z",
};

export const subHeroArticles: Post[] = [
  {
    _id: "post-sub-1",
    title: "Markets React to New Federal Trade Adjustments",
    slug: "markets-react-to-new-federal-trade-adjustments",
    excerpt: "Wall street responds immediately to adjusted tariffs and trade regulations.",
    content: `Financial markets experienced notable volatility following the administration's announcement of new federal trade adjustments. The adjustments, which modify existing tariffs on raw materials and industrial imports, triggered immediate responses across key industrial indices.

Economists note that while domestic manufacturing stocks rallied in anticipation of reduced competition, tech and consumer retail stocks faced pressure due to potential supply chain bottlenecks. Regional trade representatives are currently reviewing the new regulations to determine long-term pricing impacts for consumer goods.

Federal officials defended the adjustments, stating that they are intended to protect critical domestic industries and address structural trade imbalances. Market analysts suggest that trade-sensitive sectors will likely experience continued fluctuations until trade partners announce their responses.`,
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    category: businessCategory,
    author: "Jameson Cox",
    status: "published",
    views: 890,
    readingTime: "5 min read",
    isFeatured: false,
    publishedAt: "2 hours ago",
    createdAt: "2026-07-13T09:00:00Z",
    updatedAt: "2026-07-13T09:00:00Z",
  },
  {
    _id: "post-sub-2",
    title: "National Health Initiative Targets Remote Access",
    slug: "national-health-initiative-targets-remote-access",
    excerpt: "Federal program funds telehealth and diagnostics for rural areas.",
    content: `A newly launched health initiative aims to address the diagnostic and treatment gap in rural communities. Supported by federal grants, the program allocates resources toward expanding local clinic equipment, deploying high-speed broadband for telemedicine, and sponsoring visiting healthcare professionals.

Community leaders welcomed the initiative, citing long travel times to metropolitan hospitals as a major hurdle to basic healthcare. The program also funds mobile health units equipped with digital imaging and basic lab services, which will travel to remote townships on a weekly rotation.

Healthcare directors state that by focusing on preventative care and early intervention through remote diagnostics, the initiative could significantly reduce the rate of chronic health complications in rural regions.`,
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    category: healthCategory,
    author: "Elena Rodriguez",
    status: "published",
    views: 750,
    readingTime: "6 min read",
    isFeatured: false,
    publishedAt: "4 hours ago",
    createdAt: "2026-07-13T07:00:00Z",
    updatedAt: "2026-07-13T07:00:00Z",
  },
  {
    _id: "post-sub-3",
    title: "Offshore Wind Projects Gain Multi-State Approval",
    slug: "offshore-wind-projects-gain-multi-state-approval",
    excerpt: "Eastern seaboard states align on major offshore turbine installations.",
    content: `A consortium of eastern seaboard states has finalized approvals for a series of offshore wind turbine projects. The joint agreement establishes shared transmission infrastructure and sets clean energy production targets that will collectively power over two million homes.

Environmental organizations have expressed support, calling the project a vital milestone in reducing the region's reliance on fossil fuels. The wind farms will be positioned approximately 15 miles offshore to minimize visibility from coastal residential zones and protect local marine navigation paths.

Constructors anticipate breaking ground on the transmission stations next summer, with the first phase of turbine assemblies expected to go online within the next three years.`,
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    category: environmentCategory,
    author: "Marcus Thorne",
    status: "published",
    views: 620,
    readingTime: "8 min read",
    isFeatured: false,
    publishedAt: "6 hours ago",
    createdAt: "2026-07-13T05:00:00Z",
    updatedAt: "2026-07-13T05:00:00Z",
  },
  {
    _id: "post-sub-4",
    title: "Infrastructure Bill Includes Coastal Rail Expansion",
    slug: "infrastructure-bill-includes-coastal-rail-expansion",
    excerpt: "High-speed rail investments approved for major transit corridors.",
    content: `The newly approved infrastructure framework details substantial funding for coastal rail corridors. The project, which spans four states, aims to replace aging tracks with high-speed lines, implement advanced signaling systems, and build modern transit terminals.

Transit authorities state that the upgrades will reduce travel times between major coastal hubs by nearly 30 percent. In addition to speed improvements, the rail expansion will feature dedicated cargo tracks to ease freight congestion on parallel highways.

Construction will be divided into localized phases to prevent long-term disruptions to passenger services. Environmental impact studies have been completed, ensuring that the new routes avoid protected wetland zones along the coast.`,
    featuredImage: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80",
    category: transitCategory,
    author: "Dr. Alistair Vance",
    status: "published",
    views: 1100,
    readingTime: "10 min read",
    isFeatured: false,
    publishedAt: "8 hours ago",
    createdAt: "2026-07-13T03:00:00Z",
    updatedAt: "2026-07-13T03:00:00Z",
  },
];

export const latestNews: Post[] = [
  {
    _id: "post-latest-1",
    title: "Joint Communiqué Issued Following Regional Summit",
    slug: "joint-communique-issued-following-regional-summit",
    excerpt: "Leaders from seven nations agree on a unified approach to maritime security and cross-border environmental protection...",
    content: `Diplomatic representatives from seven nations wrapped up the annual regional summit by releasing a joint communiqué. The document outlines a shared framework for maritime security patrols, cooperative fisheries management, and real-time environmental data sharing.

The summit, which took place over three days, focused heavily on resolving overlapping trade boundaries and establishing safety guidelines for cargo vessels in international waters. Observers described the talks as productive, noting that the agreement represents a significant step forward in regional stability.

Separate bilateral meetings also resulted in preliminary agreements on research exchanges and joint ecological monitoring programs in coastal zones.`,
    featuredImage: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80",
    category: diplomacyCategory,
    author: "Sarah Jenkins",
    status: "published",
    views: 480,
    readingTime: "12 min read",
    isFeatured: false,
    publishedAt: "2026-07-13T08:30:00Z",
    createdAt: "2026-07-13T08:30:00Z",
    updatedAt: "2026-07-13T08:30:00Z",
  },
  {
    _id: "post-latest-2",
    title: "Grant Programs Announced for Digital Literacy in Schools",
    slug: "grant-programs-announced-for-digital-literacy-in-schools",
    excerpt: "The Department of Education launches a $500M initiative to provide high-speed fiber and tablet computers to rural districts...",
    content: `The Department of Education has unveiled a sweeping $500 million grant program aimed at bridging the digital divide in primary schools. The funding will target underfunded public school districts, enabling them to install high-speed fiber connections, purchase learning tablets, and train teaching staff in digital curricula.

Education advocates highlighted the program's potential to provide equitable resources to students in rural and inner-city neighborhoods. Under the grant guidelines, priority will be given to schools that currently lack basic computer labs or steady internet connections.

School boards can submit their applications beginning next month, with the first wave of funding scheduled for release ahead of the spring term.`,
    featuredImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    category: educationCategory,
    author: "Marcus Thorne",
    status: "published",
    views: 310,
    readingTime: "8 min read",
    isFeatured: false,
    publishedAt: "2026-07-13T07:15:00Z",
    createdAt: "2026-07-13T07:15:00Z",
    updatedAt: "2026-07-13T07:15:00Z",
  },
  {
    _id: "post-latest-3",
    title: "Cybersecurity Task Force to Implement New Standards",
    slug: "cybersecurity-task-force-to-implement-new-standards",
    excerpt: "New protocols for government contractors aim to secure the supply chain against increasing sophisticated digital threats...",
    content: `In response to rising threat reports, the federal Cybersecurity Task Force has finalized a new set of data security standards for all government contractors. The regulations mandate multi-factor authorization, regular penetration tests, and immediate incident reporting protocols for vendors managing public databases.

The task force emphasized that the measures are necessary to safeguard national security data and secure critical supply chains. Compliance teams from major industrial groups have expressed support for the unified guidelines, though some smaller firms have requested transition periods to cover the costs of system upgrades.

Audit agencies will begin verifying compliance for key contractors starting early next year.`,
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    category: technologyCategory,
    author: "Dr. Alistair Vance",
    status: "published",
    views: 950,
    readingTime: "15 min read",
    isFeatured: false,
    publishedAt: "2026-07-13T06:00:00Z",
    createdAt: "2026-07-13T06:00:00Z",
    updatedAt: "2026-07-13T06:00:00Z",
  },
  {
    _id: "post-latest-4",
    title: "Urban Development Fund Approves 12 New Green Spaces",
    slug: "urban-development-fund-approves-12-new-green-spaces",
    excerpt: "Major cities to receive funding for pedestrian-friendly zones and community parks to improve air quality and social...",
    content: `The Metropolitan Development Board has approved funding for twelve new community parks and pedestrian greenways. The grants, drawing from urban revitalization funds, will transform underutilized downtown lots into public parks, complete with community gardens, sports facilities, and shaded walkways.

Planning directors noted that the projects are designed to lower city temperatures, improve storm run-off absorption, and offer healthy recreation options to densely populated neighborhoods. Local artist groups will be commissioned to design public sculptures and murals in the new spaces.

Initial site clearings are slated to begin in late autumn, with full completions expected by the middle of next year.`,
    featuredImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    category: communitiesCategory,
    author: "Elena Rodriguez",
    status: "published",
    views: 540,
    readingTime: "6 min read",
    isFeatured: false,
    publishedAt: "2026-07-13T04:30:00Z",
    createdAt: "2026-07-13T04:30:00Z",
    updatedAt: "2026-07-13T04:30:00Z",
  },
];

export const trendingArticles: TrendingArticle[] = [
  {
    id: "01",
    category: "Economics",
    title: "The 2024 Budget Breakdown: What You Need to Know",
  },
  {
    id: "02",
    category: "Security",
    title: "New Travel Regulations for International Tech Exports",
  },
  {
    id: "03",
    category: "Social Policy",
    title: "Housing Crisis: Federal Subsidies Explained",
  },
  {
    id: "04",
    category: "Energy",
    title: "Energy Independence: The Nuclear Option Returns",
  },
];

export const politicsArticles: Post[] = [
  {
    _id: "post-pol-1",
    title: "Interview: The Future of Federalism",
    slug: "interview-the-future-of-federalism",
    excerpt: "Exclusive Q&A with political scientists on national balance of power.",
    content: `In this exclusive Q&A, prominent political scientists analyze the shifts in state-federal relations over the past decade. The discussion covers how recent legislative acts have reshaped funding mechanisms, the role of local court rulings in defining boundaries, and predictions for inter-governmental relations in the upcoming years.

The experts highlight that while national mandates are becoming more common in areas like data privacy and environmental standards, states are simultaneously asserting greater independence in managing local education and commerce programs.

The interview details how these dynamics could influence upcoming policy debates regarding transportation funding and federal grant distribution models.`,
    featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80",
    category: politicsCategory,
    author: "Sarah Jenkins",
    status: "published",
    views: 310,
    readingTime: "8 min read",
    isFeatured: false,
    publishedAt: "2026-07-12T12:00:00Z",
    createdAt: "2026-07-12T12:00:00Z",
    updatedAt: "2026-07-12T12:00:00Z",
  },
  {
    _id: "post-pol-2",
    title: "Voter Turnout Hits Record Highs in Primaries",
    slug: "voter-turnout-hits-record-highs-in-primaries",
    excerpt: "Higher engagement noted across all demographics in recent primary states.",
    content: `Recent primary elections have registered historic voter turnout rates across multiple key states. Election analysts attribute the rise to several factors, including early mail-in ballot expansions, high-profile congressional races, and increased outreach campaigns targeting younger demographics.

Local election offices reported smooth operations despite the high volume, credit in part to upgraded voting machines and additional staff training. Observers note that the strong primary engagement could indicate high turnout for the upcoming general election.

Statistical models are currently being updated to track shifting voter demographics and determine which policy topics motivated voters the most at the polls.`,
    featuredImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
    category: politicsCategory,
    author: "Jameson Cox",
    status: "published",
    views: 450,
    readingTime: "4 min read",
    isFeatured: false,
    publishedAt: "2026-07-12T10:00:00Z",
    createdAt: "2026-07-12T10:00:00Z",
    updatedAt: "2026-07-12T10:00:00Z",
  },
  {
    _id: "post-pol-3",
    title: "Support for New Climate Initiative Surges",
    slug: "support-for-new-climate-initiative-surges",
    excerpt: "Public surveys point to rising support for carbon reduction targets.",
    content: `Recent national polls indicate a significant surge in public support for the administration's proposed carbon reduction targets. The survey, which sampled citizens across various regions, shows that a majority now prioritize clean energy investments and industrial emissions regulations.

Legislative co-sponsors referenced the poll data during committee sessions, arguing that the public expects swift action on climate legislation. Opposing representatives have urged caution, expressing concern over potential impacts on energy prices and employment rates in traditional fuel sectors.

The debate is expected to intensify next week as the bill moves to the House floor for consideration.`,
    featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    category: politicsCategory,
    author: "Marcus Thorne",
    status: "published",
    views: 680,
    readingTime: "5 min read",
    isFeatured: false,
    publishedAt: "2026-07-12T09:00:00Z",
    createdAt: "2026-07-12T09:00:00Z",
    updatedAt: "2026-07-12T09:00:00Z",
  },
];

export const sportsArticles: Post[] = [
  {
    _id: "post-sports-1",
    title: "Championship Tournament Set for National Stadium",
    slug: "championship-tournament-set-for-national-stadium",
    excerpt: "Finalists prepare for the ultimate showdown in the upcoming national championship match.",
    content: `The stage is set for the ultimate athletic showdown as the national championship tournament moves to the historic city stadium. Following intense qualifying rounds, the remaining two teams have entered final training sessions in preparation for Sunday's championship match.

Sporting directors report that tickets sold out within hours of release, indicating record-breaking attendance and television viewership. Team captains expressed confidence during media sessions, highlighting their rigorous preparation and strategies to secure the trophy.

Pre-match activities will include a tribute to former players and a community sports festival surrounding the stadium gates.`,
    featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    category: sportsCategory,
    author: "Jameson Cox",
    status: "published",
    views: 450,
    readingTime: "4 min read",
    isFeatured: false,
    publishedAt: "2026-07-12T10:00:00Z",
    createdAt: "2026-07-12T10:00:00Z",
    updatedAt: "2026-07-12T10:00:00Z",
  },
  {
    _id: "post-sports-2",
    title: "Athletes Set New Records in Track and Field Event",
    slug: "athletes-set-new-records-in-track-and-field-event",
    excerpt: "Two junior sprinters secure national record times in the 100m and 200m relays.",
    content: `Spectators witnessed history at the track and field stadium today as two sprinters broke national speed records during the relay trials. The record, which had stood for over a decade, was bested by a fraction of a second in both the 100m and 200m relays.

Coaches credited the achievements to specialized high-altitude training regimens and updated track facilities. Both sprinters have qualified for the upcoming international athletic games and will represent the national squad next month.

The athletic association has announced bonus grants to support the athletes' training fees and travel expenses leading up to the international competition.`,
    featuredImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    category: sportsCategory,
    author: "Sarah Jenkins",
    status: "published",
    views: 310,
    readingTime: "5 min read",
    isFeatured: false,
    publishedAt: "2026-07-11T12:00:00Z",
    createdAt: "2026-07-11T12:00:00Z",
    updatedAt: "2026-07-11T12:00:00Z",
  },
];

export const allPosts: Post[] = [
  heroArticle,
  ...subHeroArticles,
  ...latestNews,
  ...politicsArticles,
  ...sportsArticles,
];
