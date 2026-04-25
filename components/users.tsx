import {
  formatCategoryLabel,
  Level,
  LEVEL_CATEGORIES,
  LEVEL_ORDER,
  LevelCategory,
} from "@/constants/config";
import { currentGame, users } from "@/constants/types";
import { PROTECTED_USER_IDS, useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Alert, Platform, Pressable, Text, TextInput, View } from "react-native";
const DisplayUsers = ({
  users,
  setUsers,
}: {
  users: users[];
  setUsers: React.Dispatch<React.SetStateAction<users[]>>;
}) => {
  const { setCurrentGame, setGamePaused } = useGlobalContext();
  const [editingUserId, setEditingUserId] = React.useState<number | null>(null);
  const [draftName, setDraftName] = React.useState("");
  const [newUserName, setNewUserName] = React.useState("");
  const [addUserError, setAddUserError] = React.useState("");
  const protectedUserIds = React.useMemo(() => new Set(PROTECTED_USER_IDS), []);

  const colorByLevel: Record<Level, string> = {
    HIGH: "bg-rose-500/20 text-rose-200 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    LOW: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  };

  const startEditing = (user: users) => {
    setEditingUserId(user.id);
    setDraftName(user.name);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setDraftName("");
  };

  const cycleLevel = (currentLevel: Level) => {
    const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % LEVEL_ORDER.length;
    return LEVEL_ORDER[nextIndex];
  };

  const updateUserLevel = (userId: number, category: LevelCategory) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
            ...user,
            [category]: cycleLevel(user[category]),
          }
          : user,
      ),
    );
  };

  const saveEditing = () => {
    if (editingUserId === null) {
      return;
    }

    const nextName = draftName.trim();
    if (!nextName) {
      cancelEditing();
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === editingUserId
          ? {
            ...user,
            name: nextName,
          }
          : user,
      ),
    );

    cancelEditing();
  };

  const addUser = () => {
    const nextName = newUserName.trim();
    if (!nextName) {
      setAddUserError("Please enter a name.");
      return;
    }

    const alreadyExists = users.some(
      (user) => user.name.toLowerCase() === nextName.toLowerCase(),
    );
    if (alreadyExists) {
      setAddUserError("This player already exists.");
      return;
    }

    const nextId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: nextId,
        name: nextName,
        points: 0,
        history: "MEDIUM",
        politics: "MEDIUM",
        sports: "MEDIUM",
        media: "MEDIUM",
        science: "MEDIUM",
      },
    ]);

    setNewUserName("");
    setAddUserError("");
  };

  const removeUser = (userId: number) => {

    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));

    setCurrentGame((prevGame: currentGame | null) => {
      if (!prevGame) {
        return prevGame;
      }

      const remainingParticipants = prevGame.participants.filter(
        (participantId) => participantId !== userId,
      );

      return {
        ...prevGame,
        participants: remainingParticipants,
        answers: prevGame.answers.filter(
          (answer) => answer.byParticipant !== userId,
        ),
        gameResults: prevGame.gameResults.filter(
          (result) => result.participantId !== userId,
        ),
      };
      // Grund: Entfernt alle Spuren des Users aus dem aktuellen Spiel.
    });
  };

  const confirmRemoveUser = (user: users) => {
    if (Platform.OS === "web") {
      const confirmed =
        typeof globalThis.confirm === "function"
          ? globalThis.confirm(`Do you really want to remove ${user.name}?`)
          : true;

      if (confirmed) {
        removeUser(user.id);
      }
      return;
    }

    Alert.alert(
      "Remove user",
      `Do you really want to remove ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeUser(user.id),
        },
      ],
    );
  };

  const resetUserPoints = (userId: number) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
            ...user,
            points: 0,
          }
          : user,
      ),
    );
  };

  const confirmResetUserPoints = (user: users) => {
    if (!protectedUserIds.has(user.id)) {
      return;
    }

    if (Platform.OS === "web") {
      const confirmed =
        typeof globalThis.confirm === "function"
          ? globalThis.confirm(`Reset points for ${user.name} to 0?`)
          : true;

      if (confirmed) {
        resetUserPoints(user.id);
      }
      return;
    }

    Alert.alert("Reset points", `Reset points for ${user.name} to 0?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => resetUserPoints(user.id),
      },
    ]);
  };

  // Die Logik muss noch auf n user angepasst werden..
  const rankLabel = (rank: number) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    return `${rank}th`;
  };

  const renderLevel = (label: string, value: Level) => (
    <View className="w-[48%] rounded-xl border border-slate-700/70 bg-slate-900/50 p-2 flex-row items-center justify-between">
      <Text className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </Text>
      <Text
        className={` self-start rounded-full border px-2.5 py-1 text-[11px] font-semibold ${colorByLevel[value]}`}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View className="px-4 pb-4 w-full">
      <View className="my-3 rounded-2xl border border-slate-700/70 bg-slate-800/75 p-4">
        <Text className="text-base font-semibold text-slate-100">Add player</Text>
        <View className="mt-3 flex-row items-center gap-2">
          <TextInput
            value={newUserName}
            onChangeText={(value) => {
              setNewUserName(value);
              if (addUserError) {
                setAddUserError("");
              }
            }}
            onSubmitEditing={addUser}
            placeholder="Player name"
            placeholderTextColor="#64748b"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-base text-slate-50"
            returnKeyType="done"
          />
          <Pressable
            onPress={addUser}
            className="rounded-xl bg-cyan-500 px-4 py-2.5"
          >
            <Text className="text-sm font-semibold text-slate-950">Add</Text>
          </Pressable>
        </View>
        {addUserError ? (
          <Text className="mt-2 text-sm text-rose-300">{addUserError}</Text>
        ) : null}
      </View>

      <View className="my-3 mt-1 flex-row items-end justify-between">
        <Text className="text-2xl font-extrabold text-slate-100">Players</Text>
        <Text className="text-xs uppercase tracking-wider text-slate-400">
          {users.length} Total
        </Text>
      </View>
      {!users.length ? (
        <View className="mb-3 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 p-5">
          <Text className="text-center text-lg font-semibold text-slate-100">
            No users yet
          </Text>
          <Text className="mt-1 text-center text-slate-400">
            Add a player to start tracking scores and preferences.
          </Text>
        </View>
      ) : null}
      {users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => (
          <View
            key={user.id}
            className="mb-3 rounded-2xl border border-slate-700/70 bg-slate-800/75 p-4"
          >
            {protectedUserIds.has(user.id) ? (
              <View className="mb-2 self-start rounded-full border border-violet-500/40 bg-violet-500/15 px-2.5 py-1">
                <Text className="text-[11px] font-semibold uppercase tracking-wide text-violet-200">
                  Default user
                </Text>
              </View>
            ) : null}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                  <Text className="text-base font-bold text-cyan-200">
                    {rankLabel(index + 1)}
                  </Text>
                </View>
                <View>
                  {editingUserId === user.id ? (
                    <TextInput
                      value={draftName}
                      onChangeText={setDraftName}
                      placeholder="Player name"
                      placeholderTextColor="#64748b"
                      className="min-w-[160px] rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-base font-bold text-slate-50"
                    />
                  ) : (
                    <Text className="text-lg font-bold text-slate-50">
                      {user.name}
                    </Text>
                  )}
                  <Text className="text-xs text-slate-400">ID #{user.id}</Text>
                </View>
              </View>

              <View className="rounded-full border border-cyan-500/40 bg-cyan-500/15 px-3 py-1.5">
                <Text className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                  {user.points} pts
                </Text>
              </View>
            </View>

            <View className="mt-4 flex-row flex-wrap justify-between gap-y-2">
              {LEVEL_CATEGORIES.map((category) => {
                const levelView = renderLevel(
                  formatCategoryLabel(category),
                  user[category],
                );

                if (editingUserId !== user.id) {
                  return (
                    <React.Fragment key={category}>{levelView}</React.Fragment>
                  );
                }

                return (
                  <Pressable
                    key={category}
                    onPress={() => updateUserLevel(user.id, category)}
                    className="w-[48%]"
                  >
                    {levelView}
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-4 flex-row gap-3">
              {editingUserId === user.id ? (
                <>
                  <Pressable
                    onPress={saveEditing}
                    className="flex-1 rounded-xl bg-cyan-500 px-4 py-2.5"
                  >
                    <Text className="text-center text-sm font-semibold text-slate-950">
                      Save changes
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={cancelEditing}
                    className="flex-1 rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5"
                  >
                    <Text className="text-center text-sm font-semibold text-slate-200">
                      Cancel
                    </Text>
                  </Pressable>
                  {protectedUserIds.has(user.id) ? (
                    <Pressable
                      onPress={() => confirmResetUserPoints(user)}
                      className="flex-1 rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-2.5"
                    >
                      <Text className="text-center text-sm font-semibold text-amber-200">
                        Reset points
                      </Text>
                    </Pressable>
                  ) : null}
                  {!protectedUserIds.has(user.id) ? (
                    <Pressable
                      onPress={() => confirmRemoveUser(user)}
                      className="flex-1 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5"
                    >
                      <Text className="text-center text-sm font-semibold text-rose-200">
                        Remove
                      </Text>
                    </Pressable>
                  ) : null}
                </>
              ) : (
                <View className="flex-row gap-3">
                  <Pressable
                    onPress={() => startEditing(user)}
                    className="rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2.5"
                  >
                    <Text className="text-sm font-semibold text-cyan-200">
                      Edit user
                    </Text>
                  </Pressable>
                  {!protectedUserIds.has(user.id) ? (
                    <Pressable
                      onPress={() => confirmRemoveUser(user)}
                      className="rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5"
                    >
                      <Text className="text-sm font-semibold text-rose-200">
                        Remove
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              )}
            </View>
          </View>
        ))}
    </View>
  );
};

export default DisplayUsers;
