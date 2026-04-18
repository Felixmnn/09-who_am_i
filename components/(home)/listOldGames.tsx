import { gameResult } from "@/constants/types";
import { getUserFromId } from "@/scripts/game";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const INITIAL_VISIBLE_GAMES = 10;

type GameItemProps = {
  result: gameResult;
  matchNumber: number;
};

const GameItem = ({ result, matchNumber }: GameItemProps) => {
  const sortedResults = [...result.gameResults].sort(
    (left, right) => right.pointsEarned - left.pointsEarned,
  );
  const winner = sortedResults[0];

  return (
    <View className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <Text className="mt-1 text-xs text-slate-400">
        Game from: {new Date(result.dateTime).toLocaleString()}
      </Text>
      <Text className="mt-1 text-sm text-slate-300">
        Winner - {getUserFromId(winner?.participantId)?.name ?? "Unknown"} with{" "}
        {winner?.pointsEarned ?? 0} points
      </Text>
      <Text className="mt-1 text-xs text-slate-500">Match #{matchNumber}</Text>
    </View>
  );
};

const EmptyState = () => {
  return <Text className="mt-2 text-slate-400">No games played yet.</Text>;
};

const ListFooter = ({
  canExpand,
  expanded,
  onToggle,
}: {
  canExpand: boolean;
  expanded: boolean;
  onToggle: () => void;
}) => {
  if (!canExpand) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onToggle}
      className="mt-4 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-3"
    >
      <Text className="text-center text-sm font-semibold text-cyan-200">
        {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
      </Text>
    </TouchableOpacity>
  );
};

type ListOldGamesProps = {
  games: gameResult[];
};

const ListOldGames = ({ games }: ListOldGamesProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const sortedGames = React.useMemo(
    () =>
      [...games].sort(
        (left, right) =>
          new Date(right.dateTime).getTime() -
          new Date(left.dateTime).getTime(),
      ),
    [games],
  );

  const visibleGames = React.useMemo(
    () =>
      expanded ? sortedGames : sortedGames.slice(0, INITIAL_VISIBLE_GAMES),
    [expanded, sortedGames],
  );

  const canExpand = sortedGames.length > INITIAL_VISIBLE_GAMES;

  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <Text className="text-lg font-semibold text-slate-100">Last Games</Text>
      <FlatList
        data={visibleGames}
        keyExtractor={(item, index) => `${item.dateTime}-${index}`}
        renderItem={({ item, index }) => (
          <GameItem result={item} matchNumber={sortedGames.length - index} />
        )}
        ListEmptyComponent={EmptyState}
        ListFooterComponent={
          <ListFooter
            canExpand={canExpand}
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
          />
        }
        scrollEnabled={false}
      />
    </View>
  );
};

export default ListOldGames;
