import { createContext, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider({ children }) {
  let [UserToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
