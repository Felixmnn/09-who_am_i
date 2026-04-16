import { users } from "@/constants/types";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

//EXP: This component is responsible for displaying the users
//TSK: EASY The UI should be polished // DONE
//TSK: MEDIUM There should be a way to edit the users to edit a user the method setUsers should be used --> test with calling userRanking.tsx to
// ... to ensure global change

const DisplayUsers = ({
  users,
  setUsers,
}: {
  users: users[];
  setUsers: React.Dispatch<React.SetStateAction<users[]>>;
}) => {
  const [editingUserId, setEditingUserId] = React.useState<number | null>(null);
  const [draftName, setDraftName] = React.useState("");

  const colorByLevel: Record<string, string> = {
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

  const renderLevel = (label: string, value: string) => (
    <View className="w-[48%] rounded-xl border border-slate-700/70 bg-slate-900/50 p-2 flex-row items-center justify-between">
      <Text className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </Text>
      <Text
        className={` self-start rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
          colorByLevel[value] ?? "bg-slate-700 text-slate-200 border-slate-600"
        }`}
      >
        {value}
      </Text>
    </View>
  );
  // if no users are present show a message to add a user (still needs to be tested if working)
  if (!users.length) {
    return (
      <View className="mx-4 mt-6 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 p-5">
        <Text className="text-center text-lg font-semibold text-slate-100">
          No users yet
        </Text>
        <Text className="mt-1 text-center text-slate-400">
          Add a player to start tracking scores and preferences.
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 pb-4 w-full">
      <View className="my-3 mt-1 flex-row items-end justify-between">
        <Text className="text-2xl font-extrabold text-slate-100">Players</Text>
        <Text className="text-xs uppercase tracking-wider text-slate-400">
          {users.length} Total
        </Text>
      </View>
      {users.map((user) => (
        <View
          key={user.id}
          className="mb-3 rounded-2xl border border-slate-700/70 bg-slate-800/75 p-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                <Text className="text-base font-bold text-cyan-200">
                  {user.name.slice(0, 1).toUpperCase()}
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
            {renderLevel("History", user.history)}
            {renderLevel("Politics", user.politics)}
            {renderLevel("Sports", user.sports)}
            {renderLevel("Media", user.media)}
            {renderLevel("Science", user.science)}
          </View>

          <View className="mt-4 flex-row gap-3">
            {editingUserId === user.id ? (
              <>
                <Pressable
                  onPress={saveEditing}
                  className="flex-1 rounded-xl bg-cyan-500 px-4 py-2.5"
                >
                  <Text className="text-center text-sm font-semibold text-slate-950">
                    Save
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
              </>
            ) : (
              <Pressable
                onPress={() => startEditing(user)}
                className="rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2.5"
              >
                <Text className="text-sm font-semibold text-cyan-200">
                  Edit name
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default DisplayUsers;
