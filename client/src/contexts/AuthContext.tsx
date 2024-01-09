import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "@/utilities/tokenService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "@/models/User";
import mingleAxios, { nonTokenAxios } from "@/utilities/axios";

interface AuthContextProps {
  user?: User;
  isLogin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  clearAuth: () => void;
  updateUser: (newUser: User) => void;
  onSuccessLogin: (response) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const lastUser = localStorage.getItem("_id");
    return !!lastUser;
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        if (isLogin) {
          const userid = localStorage.getItem("_id");
          const res = await mingleAxios.get(`users/${userid}`);
          setUser(res.data as User);
        } else {
          localStorage.removeItem("_id");
          setUser(undefined);
        }
      } catch (error: any) {
        if (error?.response?.status !== 403) clearAuth();
        console.error("Error fetching user data:", error);
      }
    };
    getUserById();
  }, [isLogin]);

  const onSuccessLogin = (response) => {
    saveAccessToken(response.data.accessToken);
    saveRefreshToken(response.data.refreshToken);
    localStorage.setItem("_id", response.data._id);
    setIsLogin(true);
  };

  const login = (email: string, password: string) => {
    nonTokenAxios
      .post("/auth/login/", { email, password })
      .then((response: any) => {
        onSuccessLogin(response);
      })
      .catch((error: any) => {
        clearAuth();
        console.error(error);
      });
  };

  const logout = () => {
    nonTokenAxios
      .post("/auth/logout/", null, {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      })
      .then(() => clearAuth())
      .catch((error: any) => {
        clearAuth();
        console.error(error);
      });
  };

  const clearAuth = () => {
    setIsLogin(false);
    removeAccessToken();
    removeRefreshToken();
    localStorage.removeItem("_id");
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        login,
        logout,
        clearAuth,
        updateUser,
        onSuccessLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
