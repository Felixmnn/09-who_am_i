import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      name: "Felix",
      points: 100,
      history: "LOW",
      politics: "HIGH",
      sports: "MEDIUM",
      media: "LOW",
      science: "MEDIUM",
    },
    {
      name: "Pamveer",
      points: 200,
      history: "HIGH",
      politics: "MEDIUM",
      sports: "LOW",
      media: "HIGH",
      science: "LOW",
    },
  ]);

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
