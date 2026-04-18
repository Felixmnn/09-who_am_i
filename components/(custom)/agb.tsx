import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AGB_SECTIONS = [
  {
    title: "1. Geltungsbereich",
    body: "Geltungsbereich...",
  },
  {
    title: "2. Nutzung der Inhalte",
    body: "Nutzung ...",
  },
  {
    title: "3. Speicherung von Daten",
    body: "Daten ...",
  },
  {
    title: "4. Haftung",
    body: "Haftung ...",
  },
  {
    title: "5. Änderungen",
    body: "Änderungen ...",
  },
];

const AGB = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View className=" w-full rounded-xl border border-slate-800 bg-slate-900/90 p-4">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View className="flex-1 pr-4">
          <Text className="text-2xl font-extrabold text-slate-100">AGB</Text>
          <Text className="mt-1 text-sm text-slate-400">
            Vorlage für Allgemeine Geschäftsbedingungen dieser App.
          </Text>
        </View>

        <FontAwesome
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#94a3b8"
        />
      </TouchableOpacity>

      {expanded && (
        <View className="mt-4 gap-3">
          <View className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <Text className="text-sm leading-6 text-slate-300">
              Hinweis: Dies ist eine Platzhalter-Vorlage.
            </Text>
          </View>

          {AGB_SECTIONS.map((section) => (
            <View
              key={section.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
            >
              <Text className="text-base font-bold text-slate-100">
                {section.title}
              </Text>
              <Text className="mt-2 text-sm leading-6 text-slate-300">
                {section.body}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AGB;
