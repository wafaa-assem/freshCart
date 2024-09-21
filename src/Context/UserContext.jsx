import { createContext, useEffect, useState } from "react";

export const userContext = createContext();
export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("tkn"));
  useEffect(() => {
    //execute ?    1- mount phase       2- every time rerender for token
    token ? localStorage.setItem("tkn", token) : localStorage.removeItem("tkn");
  }, [token]);

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
