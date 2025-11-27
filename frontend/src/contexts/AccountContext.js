import { createContext, useState, useEffect } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";
import { ACCOUNT_ENDPOINT } from "../config/constants";

// Create account context
const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { token, removeToken, setToken } = useToken();
  const [isAuth, setIsAuth] = useState(!!token); // in our app, token never expire
  const [account, setAccount] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);

  // for later i can have a full login function
  // that takes the token and sets it here
  // its a greater abstraction
  const login = (newToken) => {
    setToken(newToken);
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    removeToken();
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      setAccountLoading(true); // Set loading to true before fetching
      console.log("fetching account info");
      try {
        const response = await axios.get(ACCOUNT_ENDPOINT, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAccount(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setAccountLoading(false);
      }
    };

    if (isAuth) {
      fetchAccountInfo();
    } else {
      setAccount(null); // Reset account to null when not authenticated
      setAccountLoading(false);
    }
  }, [isAuth, token]);

  const getInitials = () => {
    if (isAuth && account) {
      if (account.first_name && account.last_name) {
        return (
          account.first_name[0].toUpperCase() +
          account.last_name[0].toUpperCase()
        );
      } else {
        return account.username[0].toUpperCase();
      }
    }
    return "KA";
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        accountLoading,
        setAccountLoading,
        getInitials,
        setIsAuth,
        isAuth,
        logout,
        login,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
