import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  //EXP: Users is an array of user objects with their points and preferences
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

  //EXP: Custom Names are names that extend the default list
  const [customNames, setCustomNames] = useState({
    history: [
      {
        id: "6",
        name: "Stalin",
        difficulty: "LOW",
      },
    ],
    politics: [
      {
        id: "1",
        name: "Putin",
        difficulty: "LOW",
      },
    ],
    sports: [],
    media: [
      {
        id: "7",
        name: "Lutz Fanderhorst",
        difficulty: "HIGH",
      },
    ],
    science: [],
    custom: [],
  });

  //EXP: Last Game Results is an array of game results
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
              id: "6",
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
              id: "7",
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

  //EXP: Current Game is the game that is currently being played
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
