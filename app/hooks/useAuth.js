import React from "react";
import jwtDecode from "jwt-decode";

import authStorage from "../auth/storage";
import AuthContext from "../auth/context";

export default useAuth = () => {
  const { user, setUser } = React.useContext(AuthContext);

  const logIn = async (token) => {
    const user = jwtDecode(token);
    setUser(user);
    await authStorage.store(token);
  };

  const logOut = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
