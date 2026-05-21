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

const DIFFICULTIES = ["LOW", "MEDIUM", "HIGH"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  LOW: "leicht",
  MEDIUM: "mittel",
  HIGH: "schwer",
};

const DIFFICULTY_BUTTON_STYLES: Record<Difficulty, string> = {
  LOW: "border-emerald-400/40 bg-emerald-500/15",
  MEDIUM: "border-amber-400/40 bg-amber-500/15",
  HIGH: "border-rose-400/40 bg-rose-500/15",
};

const CATEGORY_CYCLE_ORDER = [
  "custom",
  "history",
  "politics",
  "sports",
  "media",
  "science",
] as const;

const ManageNames = () => {
  const { customNames, setCustomNames, blackList, setBlackList } =
    useGlobalContext();

  const [target, setTarget] = React.useState<ListTarget>("customNames");
  const [expanded, setExpanded] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("custom");
  const [nameValue, setNameValue] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<Difficulty>("LOW");

  const cycleDifficulty = () => {
    const currentIndex = DIFFICULTIES.indexOf(difficulty);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % DIFFICULTIES.length;
    setDifficulty(DIFFICULTIES[nextIndex]);
  };

  const cycleCategory = () => {
    const currentIndex = CATEGORY_CYCLE_ORDER.indexOf(
      selectedCategory as (typeof CATEGORY_CYCLE_ORDER)[number],
    );
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % CATEGORY_CYCLE_ORDER.length;
    setSelectedCategory(CATEGORY_CYCLE_ORDER[nextIndex]);
  };

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

  const canAddName = nameValue.trim().length > 0;

  return (
    <View className="mb-4  rounded-xl border border-slate-800 bg-slate-900/90 p-4 ">
      <TouchableOpacity
        className="flex-row items-center justify-between w-full"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View>
          <Text className="text-2xl font-extrabold text-slate-100">
            Namen verwalten
          </Text>
          <Text className="mt-1 text-sm text-slate-400">
            Füge Namen hinzu oder entferne sie aus eigenen Namen und Sperrliste.
          </Text>
        </View>
      </TouchableOpacity>
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
            Eigene Namen
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
            Sperrliste
          </Text>
        </TouchableOpacity>
      </View>
      {target !== "blackList" && (
        <View>
          <Text className="mt-4 text-sm font-semibold text-slate-300">
            Namen hinzufügen
          </Text>
          <View className="mt-2 flex-row gap-2 items-center">
            <TextInput
              value={nameValue}
              onChangeText={setNameValue}
              placeholder="Neuen Namen eingeben"
              placeholderTextColor="#64748b"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100"
            />
            <TouchableOpacity
              className={`w-24 items-center rounded-xl border px-3 py-3 ${DIFFICULTY_BUTTON_STYLES[difficulty]}`}
              onPress={cycleDifficulty}
            >
              <Text className="text-xs font-semibold uppercase text-slate-100">
                {DIFFICULTY_LABELS[difficulty]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-28 items-center rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-3 py-3"
              onPress={cycleCategory}
            >
              <Text className="text-xs font-semibold uppercase text-slate-100">
                {selectedCategory}
              </Text>
            </TouchableOpacity>
          </View>

          {canAddName && (
            <TouchableOpacity
              className="mt-4 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2"
              onPress={addName}
            >
              <Text className="text-center font-bold text-slate-100">
                Namen hinzufügen
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {expanded && (
        <>
          <Text className="mt-3 text-sm font-semibold text-slate-300">
            Aktuelle Einträge
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
                    <RenderLevel
                      label="Schwierigkeit"
                      value={entry.difficulty}
                    />
                  </View>

                  <TouchableOpacity
                    className="rounded-lg border border-rose-400/40 bg-rose-500/15 px-3 py-1.5"
                    onPress={() => removeName(entry.id)}
                  >
                    <Text className="text-xs font-bold text-rose-200">
                      Entfernen
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
