import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const USERS_STORAGE_KEY = "@whoami_users";
const DEFAULT_USERS = [
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
    name: "Parmveer",
    points: 200,
    history: "HIGH",
    politics: "MEDIUM",
    sports: "LOW",
    media: "HIGH",
    science: "LOW",
  },
];

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  //EXP: Users is an array of user objects with their points and preferences
  const [users, setUsers] = useState([]);
  const [isUsersHydrated, setIsUsersHydrated] = useState(false);

  const [muted, setMuted] = useState(false);
  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsers) {
          if (mounted) {
            setUsers(DEFAULT_USERS);
          }
          return;
        }

        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && mounted) {
          setUsers(parsedUsers);
        } else if (mounted) {
          setUsers(DEFAULT_USERS);
        }
      } catch (error) {
        console.warn("Could not load users from storage", error);
        if (mounted) {
          setUsers(DEFAULT_USERS);
        }
      } finally {
        if (mounted) {
          setIsUsersHydrated(true);
        }
      }
    };

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isUsersHydrated) {
      return;
    }

    const persistUsers = async () => {
      try {
        await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      } catch (error) {
        console.warn("Could not persist users to storage", error);
      }
    };

    persistUsers();
  }, [users, isUsersHydrated]);

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
        name: "Lutz van Derhorst",
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
      answers: [
        {
          category: "history",
          id: "6",
          name: "Stalin",
          difficulty: "LOW",
          correct: true,
          byParticipant: 1,
        },
        {
          category: "politics",
          id: "1",
          name: "Putin",
          difficulty: "LOW",
          correct: false,
          byParticipant: 2,
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

  //EXP: Blacklisted Names won't be used in the game
  const [blackList, setBlackList] = useState({
    history: [],
    politics: [],
    sports: [],
    media: [],
    science: [],
    custom: [],
  });

  const [gamePaused, setGamePaused] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        isUsersHydrated,
        customNames,
        setCustomNames,
        lastGameResults,
        setLastGameResults,
        currentGame,
        setCurrentGame,
        blackList,
        setBlackList,
        muted,
        setMuted,
        gamePaused,
        setGamePaused,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
