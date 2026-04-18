import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import RenderLevel from "../renderLevel";

type ListTarget = "customNames" | "blackList";

type NameItem = {
  id: string;
  name: string;
  difficulty: string;
};

const DEFAULT_CATEGORIES = [
  "history",
  "politics",
  "sports",
  "media",
  "science",
  "custom",
];

const DIFFICULTIES = ["LOW", "MEDIUM", "HIGH"];

const ManageNames = () => {
  const { customNames, setCustomNames, blackList, setBlackList } =
    useGlobalContext();

  const [target, setTarget] = React.useState<ListTarget>("customNames");
  const [expanded, setExpanded] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("history");
  const [nameValue, setNameValue] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("LOW");

  const categories = React.useMemo(() => {
    const keys = new Set<string>([
      ...DEFAULT_CATEGORIES,
      ...Object.keys(customNames ?? {}),
    ]);
    return Array.from(keys);
  }, [customNames]);

  React.useEffect(() => {
    if (!categories.includes(selectedCategory) && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const entries: NameItem[] =
    target === "blackList"
      ? (blackList ?? [])
      : (customNames?.[selectedCategory] ?? []);

  const addName = () => {
    const trimmed = nameValue.trim();
    if (!trimmed) {
      return;
    }

    const normalized = trimmed.toLowerCase();
    const exists = entries.some(
      (entry) => entry.name.toLowerCase() === normalized,
    );
    if (exists) {
      return;
    }

    const newEntry: NameItem = {
      id: `${Date.now()}`,
      name: trimmed,
      difficulty,
    };

    if (target === "customNames") {
      setCustomNames((prev: Record<string, NameItem[]>) => ({
        ...prev,
        [selectedCategory]: [...(prev?.[selectedCategory] ?? []), newEntry],
      }));
    } else {
      setBlackList((prev: NameItem[]) => [...(prev ?? []), newEntry]);
    }

    setNameValue("");
  };

  const removeName = (id: string) => {
    if (target === "customNames") {
      setCustomNames((prev: Record<string, NameItem[]>) => ({
        ...prev,
        [selectedCategory]: (prev?.[selectedCategory] ?? []).filter(
          (entry) => entry.id !== id,
        ),
      }));
    } else {
      setBlackList((prev: NameItem[]) =>
        (prev ?? []).filter((entry) => entry.id !== id),
      );
    }
  };

  const colorByLevel: Record<string, string> = {
    HIGH: "bg-rose-500/20 text-rose-200 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    LOW: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  };

  return (
    <View className="mb-4  rounded-xl border border-slate-800 bg-slate-900/90 p-4 ">
      <TouchableOpacity
        className="flex-row items-center justify-between w-full"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View>
          <Text className="text-2xl font-extrabold text-slate-100">
            Manage Names
          </Text>
          <Text className="mt-1 text-sm text-slate-400">
            Füge Namen hinzu oder entferne sie aus Custom Names und Blacklist.
          </Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          <View className="mt-4 flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 rounded-xl border px-3 py-2 ${
                target === "customNames"
                  ? "border-cyan-400/40 bg-cyan-500/15"
                  : "border-slate-700 bg-slate-800"
              }`}
              onPress={() => setTarget("customNames")}
            >
              <Text className="text-center font-semibold text-slate-100">
                Custom Names
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 rounded-xl border px-3 py-2 ${
                target === "blackList"
                  ? "border-rose-400/40 bg-rose-500/15"
                  : "border-slate-700 bg-slate-800"
              }`}
              onPress={() => setTarget("blackList")}
            >
              <Text className="text-center font-semibold text-slate-100">
                Blacklist
              </Text>
            </TouchableOpacity>
          </View>
          {target !== "blackList" && (
            <View>
              <Text className="mt-4 text-sm font-semibold text-slate-300">
                Category
              </Text>
              <View className="mt-2 flex-row flex-wrap">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`mr-2 mt-2 rounded-lg border px-3 py-1.5 ${
                      selectedCategory === category
                        ? "border-cyan-400/40 bg-cyan-500/15"
                        : "border-slate-700 bg-slate-800"
                    }`}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text className="text-xs font-semibold uppercase text-slate-200">
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="mt-4 text-sm font-semibold text-slate-300">
                Name
              </Text>
              <TextInput
                value={nameValue}
                onChangeText={setNameValue}
                placeholder="Neuen Namen eingeben"
                placeholderTextColor="#64748b"
                className="mt-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100"
              />

              <Text className="mt-4 text-sm font-semibold text-slate-300">
                Difficulty
              </Text>
              <View className="mt-2 flex-row gap-2">
                {DIFFICULTIES.map((level) => (
                  <TouchableOpacity
                    key={level}
                    className={`flex-1 rounded-lg border px-3 py-2 ${
                      difficulty === level
                        ? `${colorByLevel[level]} border-${colorByLevel[level].split(" ")[2]}`
                        : "border-slate-700 bg-slate-800"
                    }`}
                    onPress={() => setDifficulty(level)}
                  >
                    <Text className="text-center text-xs font-semibold text-slate-200">
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                disabled={!nameValue.trim()}
                className="mt-4 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-3"
                onPress={addName}
              >
                <Text className="text-center font-bold text-slate-100">
                  Add Name
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Text className="mt-5 text-sm font-semibold text-slate-300">
            Current Entries
          </Text>
          <View className="rounded-2xl  ">
            {entries.length === 0 ? (
              <Text className="text-sm text-slate-500">
                Keine Eintraege vorhanden.
              </Text>
            ) : (
              entries.map((entry) => (
                <View
                  key={entry.id}
                  className="mt-2 flex-row items-center justify-between rounded-xl  bg-slate-950 px-3 py-2"
                >
                  <View className="flex-1 flex-row items-center ">
                    <Text className="text-l font-bold text-slate-100 mr-2 mb-[2px]">
                      {entry.name}
                    </Text>
                    <RenderLevel label="Difficulty" value={entry.difficulty} />
                  </View>

                  <TouchableOpacity
                    className="rounded-lg border border-rose-400/40 bg-rose-500/15 px-3 py-1.5"
                    onPress={() => removeName(entry.id)}
                  >
                    <Text className="text-xs font-bold text-rose-200">
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ManageNames;
