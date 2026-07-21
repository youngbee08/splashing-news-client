import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./contexts/UserContext.tsx";
import PostProvider from "./contexts/PostContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <PostProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </PostProvider>
        </UserProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
);

