import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AGB_SECTIONS = [
  {
    title: "1. Geltungsbereich",
    body: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung dieser mobilen Anwendung (nachfolgend „App“). Mit dem Download oder der Nutzung der App erklärt sich der Nutzer mit diesen AGB einverstanden. Abweichende Bedingungen des Nutzers finden keine Anwendung.",
  },
  {
    title: "2. Leistungsbeschreibung",
    body: "Die App stellt Funktionen zur Verfügung, die ausschließlich lokal auf dem Endgerät des Nutzers ausgeführt werden. Es erfolgt keine serverseitige Verarbeitung oder Speicherung von Nutzerdaten. Der Anbieter behält sich vor, Funktionen jederzeit zu ändern, zu erweitern oder einzustellen.",
  },
  {
    title: "3. Speicherung von Daten",
    body: "Alle durch die App erzeugten oder eingegebenen Daten werden ausschließlich lokal auf dem Gerät des Nutzers gespeichert. Es erfolgt keine Übertragung an externe Server oder Dritte. Der Nutzer ist selbst für die Sicherung seiner Daten verantwortlich. Bei Deinstallation der App können sämtliche Daten unwiederbringlich gelöscht werden.",
  },
  {
    title: "4. Nutzungsrechte",
    body: "Die App wird dem Nutzer zur privaten Nutzung zur Verfügung gestellt. Eine kommerzielle Nutzung, Vervielfältigung, Bearbeitung oder Weitergabe der App oder einzelner Bestandteile ist ohne ausdrückliche Zustimmung des Anbieters nicht gestattet.",
  },
  {
    title: "5. Haftung",
    body: "Die Nutzung der App erfolgt auf eigene Gefahr. Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Für Datenverlust, insbesondere durch unsachgemäße Nutzung oder technische Probleme des Endgeräts, wird keine Haftung übernommen.",
  },
  {
    title: "6. Verfügbarkeit",
    body: "Der Anbieter übernimmt keine Gewähr für eine ununterbrochene oder fehlerfreie Verfügbarkeit der App. Wartungsarbeiten, Weiterentwicklungen oder technische Störungen können die Nutzung vorübergehend einschränken.",
  },
  {
    title: "7. Änderungen der AGB",
    body: "Der Anbieter behält sich vor, diese AGB jederzeit mit Wirkung für die Zukunft zu ändern. Änderungen werden innerhalb der App bekannt gegeben. Die weitere Nutzung der App gilt als Zustimmung zu den geänderten Bedingungen.",
  },
  {
    title: "8. Schlussbestimmungen",
    body: "Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
];

const AGB = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-4">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View className="flex-1 pr-4">
          <Text className="text-2xl font-extrabold text-slate-100">AGB</Text>
          <Text className="mt-1 text-sm text-slate-400">
            Allgemeine Geschäftsbedingungen dieser App.
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
              Hinweis: Diese AGB stellen eine allgemeine Vorlage dar und
              ersetzen keine rechtliche Beratung.
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
