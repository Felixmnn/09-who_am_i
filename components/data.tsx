import { LEVEL_CATEGORIES } from "@/constants/config";
import { users as User } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the user ranking and the user stats
//TSK: EASY The UI should be polished // DONE

const UserRanking = () => {
  const { users } = useGlobalContext();
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  const colorByLevel: Record<string, string> = {
    HIGH: "bg-rose-500/20 text-rose-200 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    LOW: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
    EASY: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  };

  // Die Logik muss noch auf n user angepasst werden..
  const rankLabel = (rank: number) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    return `${rank}th`;
  };

  const renderLevel = (label: string, value: string) => (
    <View className="w-[48%] rounded-xl border border-slate-700/70 bg-slate-900/50 p-2">
      <Text className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </Text>
      <Text
        className={`mt-1 self-start rounded-full border px-2.5 py-1 text-[11px] font-semibold ${colorByLevel[value] ?? "bg-slate-700 text-slate-200 border-slate-600"
          }`}
      >
        {value}
      </Text>
    </View>
  );

  if (!sortedUsers.length) {
    return (
      <View className="mt-3 w-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-4">
        <Text className="text-center text-base font-semibold text-slate-100">
          No ranking data yet
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full px-2 px-4">
      <Text className="my-3 text-2xl font-extrabold text-slate-100">
        Leader Board
      </Text>

      {sortedUsers.map((user: User, index: number) => {
        const rank = index + 1;

        return (
          <View
            key={user.id}
            className="mb-3 rounded-2xl border border-slate-700/70 bg-slate-800/75 p-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                  <Text className="text-base font-bold text-cyan-200">
                    {rankLabel(rank)}
                  </Text>
                </View>
                <View>
                  <Text className="text-lg font-bold text-slate-100">
                    {user.name}
                  </Text>
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
              {LEVEL_CATEGORIES.map((category) =>
                renderLevel(
                  category.charAt(0).toUpperCase() + category.slice(1),
                  user[category],
                )
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default UserRanking;
