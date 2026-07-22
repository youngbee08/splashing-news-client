import { useCallback, useEffect, useState } from "react";
import { UserContext } from "../hooks/UseUserContext";
import type {
  DashboardMetrics,
  User,
  UserProviderProps,
} from "../types/generalTypes";
import { toast } from "sonner";
import { setupInterceptors } from "../services/axios";
import { logoutApi, refreshTokenApi } from "../utils/apiUtility";

const EMPTY_METRICS: DashboardMetrics = {
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  totalComments: 0,
  totalCategories: 0,
  totalViews: 0,
  totalLikes: 0,
  recentPosts: [],
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dashboardMetrics, setDashboardMetrics] =
    useState<DashboardMetrics>(EMPTY_METRICS);

  const logout = useCallback(async () => {
    const logoutToast = toast.loading("Logging out");
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout API call error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("dashboardMetrics");
      setUser(null);
      setToken("");
      setIsAuthenticated(false);
      setDashboardMetrics(EMPTY_METRICS);
      toast.dismiss(logoutToast);
      toast.success("Logged out successfully");
      window.location.href = "/auth/admin-login";
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await refreshTokenApi();
      const { token: newToken, user: userData, metrics } = data || {};

      if (newToken && userData) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setToken(newToken);

        if (metrics) {
          localStorage.setItem("dashboardMetrics", JSON.stringify(metrics));
          setDashboardMetrics(metrics);
        }
        setIsAuthenticated(true);
        return data;
      }
    } catch (err: unknown) {
      console.error("Failed to refresh user session:", err);
      // logout();
      throw err;
    }
  }, [logout]);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedMetrics = localStorage.getItem("dashboardMetrics");

      if (!storedToken || !storedUser || !storedMetrics) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setDashboardMetrics(JSON.parse(storedMetrics));


        await refreshUser();
        setIsAuthenticated(true);
      } catch (error: unknown) {
        console.warn("Invalid or expired session. Clearing...");
        console.error("Session error details:", error);
        // logout();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [logout, refreshUser]);

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  const login = (token: string, userData: User, metrics: DashboardMetrics) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("dashboardMetrics", JSON.stringify(metrics));

    setUser(userData);
    setToken(token);
    setDashboardMetrics(metrics);
    setIsAuthenticated(true);
  };

  const value = {
    logout,
    user,
    token,
    login,
    isLoggedIn: isAuthenticated,
    refreshUser,
    loading,
    dashboardMetrics,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
