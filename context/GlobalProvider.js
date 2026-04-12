import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Felix",
      points: 100,
      history: "LOW",
      politics: "HIGH",
      sports: "MEDIUM",
      media: "LOW",
      science: "MEDIUM",
    },
    {
      id: 2,
      name: "Pamveer",
      points: 200,
      history: "HIGH",
      politics: "MEDIUM",
      sports: "LOW",
      media: "HIGH",
      science: "LOW",
    },
  ]);
  const [customNames, setCustomNames] = useState({
    history: [
      {
        name: "Stalin",
        difficulty: "LOW",
      },
    ],
    politics: [
      {
        name: "Putin",
        difficulty: "LOW",
      },
    ],
    sports: [],
    media: [
      {
        name: "Lutz Fanderhorst",
        difficulty: "HIGH",
      },
    ],
    science: [],
    custom: [],
  });
  const [lastGameResults, setLastGameResults] = useState([
    {
      dateTime: "2024-06-01T12:00:00Z",
      participants: [1, 2],
      rounds: [
        {
          rid: 1,
          particpant: 1,
          questions: [
            {
              category: "history",
              name: "Stalin",
              difficulty: "LOW",
              correct: true,
            },
          ],
        },
        {
          rid: 2,
          particpant: 2,
          questions: [
            {
              category: "media",
              name: "Lutz Fanderhorst",
              difficulty: "HIGH",
              correct: false,
            },
          ],
        },
      ],
      gameResults: [
        {
          participantId: 1,
          pointsEarned: 10,
        },
        {
          participantId: 2,
          pointsEarned: 0,
        },
      ],
    },
  ]);
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        customNames,
        setCustomNames,
        lastGameResults,
        setLastGameResults,
        currentGame,
        setCurrentGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
