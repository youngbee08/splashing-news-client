# Splashing News - Frontend Application

Splashing News is a modern news platform that serves readers with current stories and gives editors an easy-to-use dashboard to manage content. Readers can browse headlines, explore categories, and read full articles, while administrators can publish, edit, and track posts from any device. The interface stays fast and intuitive even with large volumes of content, so the focus stays on the stories themselves.

## Overview

This is the client-side application that powers the Splashing News website. It combines a public-facing news experience with a protected admin console, all in one React application. On the public side, visitors can explore the latest news, filter by categories like Politics or Business, search for articles, and view detailed posts with images and engagement stats. The admin area gives editorial staff a dashboard to see metrics, manage posts (create, edit, delete), and monitor publication activity. The entire app is built to feel fast, with skeleton loaders, toast notifications, and responsive design that works well on mobile, tablet, and desktop.

## Features

- **Public news browsing** — Homepage with hero articles, sub-hero highlights, latest news, and category-specific sections.
- **Category navigation** — Dedicated routes for topics like Politics, Business, Health, Sports, and more.
- **Article detail view** — Full post content with featured images, view counts, likes, comments, and reading time.
- **Search** — Instant search from the admin top bar that fetches results as you type and links directly to posts.
- **Skeleton loading states** — Custom skeleton cards and table skeletons keep the interface feeling responsive while data loads.
- **Admin dashboard** — Overview with stats (total posts, views, categories, published/draft counts, recent articles).
- **Posts management** — Table view with search, filter by category and status, pagination, edit and delete actions.
- **Create and edit posts** — Form with title, category selection, status, featured image upload (drag-and-drop supported), and content body.
- **Modal dialogs** — Edit and delete confirmations appear in accessible, branded modals.
- **Authentication flow** — Login form with validation, token storage, session refresh, and automatic logout on expiration or network errors.
- **Responsive design** — Fully responsive layouts with a mobile-friendly bottom navigation in the CMS and a clean public grid.
- **Toast notifications** — User feedback for successes, errors, and loading states via `sonner`.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| [React](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [TailwindCSS](https://tailwindcss.com) | Utility-first CSS framework |
| [Axios](https://axios-http.com) | HTTP client for API requests |
| [TanStack React Query](https://tanstack.com/query) | Server-state management and caching |
| [React Router](https://reactrouter.com) | Client-side routing |
| [Formik](https://formik.org) | Form state management |
| [Yup](https://github.com/jquense/yup) | Schema-based form validation |
| [Sonner](https://sonner.emilkowal.ski) | Toast notifications |
| [Lucide React](https://lucide.dev) | Icon set |
| [React Icons](https://react-icons.github.io/react-icons) | Additional icon library |

## Author Info
**Zenith Dev**
- Email: [hello@zenithdevtech.name.ng](mailto:hello@zenithdevtech.name.ng)
- Website: [Zenith Dev Tech](https://zenithdevtech.name.ng)
- GitHub: [youngbeeh08](https://github.com/youngbeeh08)
