import { useCallback, useEffect, useState } from "react";
import { UserContext } from "../hooks/UseUserContext";
import type {
  DashboardMetrics,
  User,
  UserProviderProps,
} from "../types/generalTypes";
import { toast } from "sonner";
import { setupInterceptors } from "../services/axios";

const EMPTY_METRICS: DashboardMetrics = {
  page_views: 0,
  activity_level: "",
  total_posts: 0,
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dashboardMetrics, setDashboardMetrics] =
    useState<DashboardMetrics>(EMPTY_METRICS);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("dashboardMetrics");
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
    setDashboardMetrics(EMPTY_METRICS);
    toast.success("Logged out successfully");
    window.location.href = "/auth/admin-login";
  }, []);

  // const refreshUser = useCallback(
  //   async (token: string) => {
  //     if (!token) throw new Error("No token");

  //     try {
  //       const response = await api.get("/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const { data } = response.data;

  //       setUser(data);
  //       localStorage.setItem("user", JSON.stringify(data));
  //     } catch (err: unknown) {
  //       console.error("Failed to refresh user:", err);
  //       if (axios.isAxiosError(err) && err.response?.status === 401) {
  //         logout();
  //       }
  //       throw err;
  //     }
  //   },
  //   [logout],
  // );

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);

        // await refreshUser(storedToken);

        setIsAuthenticated(true);
      } catch (error: unknown) {
        console.warn("Invalid or expired session. Clearing...");
        console.error("Session error details:", error);
        logout();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [logout]);

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
  };

  const value = {
    logout,
    user,
    token,
    login,
    isLoggedIn: isAuthenticated,
    refreshUser: (token: string) => {
      console.log(token);
    },
    loading,
    dashboardMetrics,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
