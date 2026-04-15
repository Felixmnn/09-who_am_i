import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const USERS_STORAGE_KEY = "@whoami_users";
const MUTED_STORAGE_KEY = "@whoami_muted";
const BLACKLIST_STORAGE_KEY = "@whoami_blacklist";
const LAST_GAME_RESULTS_STORAGE_KEY = "@whoami_lastGameResults";
const CUSTOM_NAMES_STORAGE_KEY = "@whoami_customNames";
const CURRENT_GAME_STORAGE_KEY = "@whoami_currentGame";
const GAME_PAUSED_STORAGE_KEY = "@whoami_gamePaused";
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
  const [isSettingsHydrated, setIsSettingsHydrated] = useState(false);

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
  const [blackList, setBlackList] = useState([
    {
      id: "6",
      name: "Stalin",
      difficulty: "LOW",
    },
  ]);

  const [gamePaused, setGamePaused] = useState(false);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }

    AsyncStorage.setItem(
      CURRENT_GAME_STORAGE_KEY,
      JSON.stringify(currentGame),
    ).catch((error) => {
      console.warn("Could not persist current game to storage", error);
    });

    AsyncStorage.setItem(
      GAME_PAUSED_STORAGE_KEY,
      JSON.stringify(gamePaused),
    ).catch((error) => {
      console.warn("Could not persist game paused state to storage", error);
    });
  }, [currentGame, gamePaused, isSettingsHydrated]);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }

    AsyncStorage.setItem(MUTED_STORAGE_KEY, JSON.stringify(muted)).catch(
      (error) => {
        console.warn("Could not persist muted state to storage", error);
      },
    );
  }, [muted, isSettingsHydrated]);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }

    AsyncStorage.setItem(
      BLACKLIST_STORAGE_KEY,
      JSON.stringify(blackList),
    ).catch((error) => {
      console.warn("Could not persist blacklist to storage", error);
    });
  }, [blackList, isSettingsHydrated]);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }

    AsyncStorage.setItem(
      LAST_GAME_RESULTS_STORAGE_KEY,
      JSON.stringify(lastGameResults),
    ).catch((error) => {
      console.warn("Could not persist last game results to storage", error);
    });
  }, [lastGameResults, isSettingsHydrated]);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }

    AsyncStorage.setItem(
      CUSTOM_NAMES_STORAGE_KEY,
      JSON.stringify(customNames),
    ).catch((error) => {
      console.warn("Could not persist custom names to storage", error);
    });
  }, [customNames, isSettingsHydrated]);

  /**
   * This function gets called when the app starts and it initalizes all Functions
   */
  async function initializeSettings() {
    try {
      const [
        storedMuted,
        storedBlackList,
        storedLastGameResults,
        storedCustomNames,
        storedCurrentGame,
        storedGamePaused,
      ] = await Promise.all([
        AsyncStorage.getItem(MUTED_STORAGE_KEY),
        AsyncStorage.getItem(BLACKLIST_STORAGE_KEY),
        AsyncStorage.getItem(LAST_GAME_RESULTS_STORAGE_KEY),
        AsyncStorage.getItem(CUSTOM_NAMES_STORAGE_KEY),
        AsyncStorage.getItem(CURRENT_GAME_STORAGE_KEY),
        AsyncStorage.getItem(GAME_PAUSED_STORAGE_KEY),
      ]);

      if (storedMuted !== null) {
        const parsedMuted = JSON.parse(storedMuted);
        if (typeof parsedMuted === "boolean") {
          setMuted(parsedMuted);
        }
      }

      if (storedBlackList !== null) {
        const parsedBlackList = JSON.parse(storedBlackList);
        if (Array.isArray(parsedBlackList)) {
          setBlackList(parsedBlackList);
        }
        // Altes Format {history:[], ...} wird ignoriert und mit dem leeren Array-Default überschrieben
      }

      if (storedLastGameResults !== null) {
        const parsedLastGameResults = JSON.parse(storedLastGameResults);
        if (Array.isArray(parsedLastGameResults)) {
          setLastGameResults(parsedLastGameResults);
        }
      }

      if (storedCustomNames !== null) {
        const parsedCustomNames = JSON.parse(storedCustomNames);
        if (
          parsedCustomNames &&
          typeof parsedCustomNames === "object" &&
          !Array.isArray(parsedCustomNames)
        ) {
          setCustomNames(parsedCustomNames);
        }
      }

      if (storedCurrentGame !== null) {
        const parsedCurrentGame = JSON.parse(storedCurrentGame);
        if (
          parsedCurrentGame === null ||
          typeof parsedCurrentGame === "object"
        ) {
          setCurrentGame(parsedCurrentGame);
        }
      }

      if (storedGamePaused !== null) {
        const parsedGamePaused = JSON.parse(storedGamePaused);
        if (typeof parsedGamePaused === "boolean") {
          setGamePaused(parsedGamePaused);
        }
      }
    } catch (error) {
      console.warn("Could not initialize settings from storage", error);
    } finally {
      setIsSettingsHydrated(true);
    }
  }

  useEffect(() => {
    initializeSettings();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        isUsersHydrated,
        isSettingsHydrated,
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
