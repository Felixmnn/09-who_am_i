import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const USERS_STORAGE_KEY = "@whoami_users";
export const MUTED_STORAGE_KEY = "@whoami_muted";
export const BLACKLIST_STORAGE_KEY = "@whoami_blacklist";
export const LAST_GAME_RESULTS_STORAGE_KEY = "@whoami_lastGameResults";
export const CUSTOM_NAMES_STORAGE_KEY = "@whoami_customNames";
export const CURRENT_GAME_STORAGE_KEY = "@whoami_currentGame";
export const GAME_PAUSED_STORAGE_KEY = "@whoami_gamePaused";
export const ALREADY_GUESSED_NAMES_STORAGE_KEY = "@whoami_alreadyGuessedNames";
export const PROTECTED_USER_IDS = [1, 2];

const DEFAULT_USERS = [
  {
    id: 1,
    name: "User1",
    points: 0,
    history: "LOW",
    politics: "HIGH",
    sports: "MEDIUM",
    media: "LOW",
    science: "MEDIUM",
  },
  {
    id: 2,
    name: "User2",
    points: 0,
    history: "HIGH",
    politics: "MEDIUM",
    sports: "LOW",
    media: "HIGH",
    science: "LOW",
  },
];

export const createDefaultUsers = () => DEFAULT_USERS.map((user) => ({ ...user }));

const ensureProtectedDefaultUsers = (storedUsers) => {
  if (!Array.isArray(storedUsers)) {
    return createDefaultUsers();
  }

  const userById = new Map(storedUsers.map((user) => [user.id, user]));
  const mergedDefaults = DEFAULT_USERS.map((defaultUser) => {
    const existing = userById.get(defaultUser.id);
    return existing ? existing : { ...defaultUser };
  });

  const additionalUsers = storedUsers.filter(
    (user) => !PROTECTED_USER_IDS.includes(user.id),
  );

  return [...mergedDefaults, ...additionalUsers];
  // Grund: Stellt sicher, dass die Default-User immer vorhanden und unverändert sind, auch wenn sie aus dem Storage fehlen oder verändert wurden.
};

export const createDefaultCustomNames = () => ({
  history: [],
  politics: [],
  sports: [],
  media: [],
  science: [],
  custom: [],
});

export const createDefaultLastGameResults = () => [
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
];

export const createDefaultBlackList = () => [
  {
    id: "6",
    name: "Stalin",
    difficulty: "LOW",
  },
];

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  //EXP: Users is an array of user objects with their points and preferences
  const [users, setUsers] = useState(createDefaultUsers());
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
            setUsers(createDefaultUsers());
          }
          return;
        }

        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && mounted) {
          setUsers(ensureProtectedDefaultUsers(parsedUsers));
        } else if (mounted) {
          setUsers(createDefaultUsers());
        }
      } catch (error) {
        console.warn("Could not load users from storage", error);
        if (mounted) {
          setUsers(createDefaultUsers());
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
  const [customNames, setCustomNames] = useState(createDefaultCustomNames());

  //EXP: Last Game Results is an array of game results
  const [lastGameResults, setLastGameResults] = useState(
    createDefaultLastGameResults(),
  );

  //EXP: Current Game is the game that is currently being played
  const [currentGame, setCurrentGame] = useState(null);

  //EXP: Blacklisted Names won't be used in the game
  const [blackList, setBlackList] = useState(createDefaultBlackList());

  const [gamePaused, setGamePaused] = useState(false);
  const [alreadyGuessedNames, setAlreadyGuessedNames] = useState([]);

  useEffect(() => {
    setCurrentGame((prevGame) => {
      if (!prevGame) {
        return prevGame;
      }

      const validUserIds = new Set(users.map((user) => user.id));
      const validParticipants = prevGame.participants.filter((participantId) =>
        validUserIds.has(participantId),
      );

      if (validParticipants.length === prevGame.participants.length) {
        return prevGame;
      }

      if (validParticipants.length === 0) {
        setGamePaused(false);
        return null;
        // Grund: Wenn nach User-Änderungen keine gültigen Teilnehmer mehr übrig sind, wird das laufende Spiel beendet.
      }

      return {
        ...prevGame,
        participants: validParticipants,
        answers: prevGame.answers.filter((answer) =>
          validUserIds.has(answer.byParticipant),
        ),
        gameResults: prevGame.gameResults.filter((result) =>
          validUserIds.has(result.participantId),
        ),
      };
      // Grund: Entfernt alle ungültigen Teilnehmer und deren Daten aus dem aktuellen Spiel.
    });
  }, [users]);

  useEffect(() => {
    if (!isSettingsHydrated) {
      return;
    }
    AsyncStorage.setItem(
      ALREADY_GUESSED_NAMES_STORAGE_KEY,
      JSON.stringify(alreadyGuessedNames),
    ).catch((error) => {
      console.warn("Could not persist already guessed names to storage", error);
    });
  }, [alreadyGuessedNames, isSettingsHydrated]);

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
        alreadyGuessedNames,
      ] = await Promise.all([
        AsyncStorage.getItem(MUTED_STORAGE_KEY),
        AsyncStorage.getItem(BLACKLIST_STORAGE_KEY),
        AsyncStorage.getItem(LAST_GAME_RESULTS_STORAGE_KEY),
        AsyncStorage.getItem(CUSTOM_NAMES_STORAGE_KEY),
        AsyncStorage.getItem(CURRENT_GAME_STORAGE_KEY),
        AsyncStorage.getItem(GAME_PAUSED_STORAGE_KEY),
        AsyncStorage.getItem(ALREADY_GUESSED_NAMES_STORAGE_KEY),
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

      if (alreadyGuessedNames !== null) {
        const parsedAlreadyGuessedNames = JSON.parse(alreadyGuessedNames);
        if (Array.isArray(parsedAlreadyGuessedNames)) {
          console.log(
            "Loaded already guessed names from storage:",
            parsedAlreadyGuessedNames.length,
          );
          setAlreadyGuessedNames(parsedAlreadyGuessedNames);
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
        alreadyGuessedNames,
        setAlreadyGuessedNames,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
