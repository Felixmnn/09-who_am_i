import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AGB_SECTIONS = [
  {
    title: "1. Geltungsbereich",
    body: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung dieser mobilen Anwendung Who Am I. Mit dem Download, der Installation oder der Nutzung der App erklärt sich der Nutzer mit diesen Bedingungen einverstanden. Abweichende Bedingungen des Nutzers finden keine Anwendung, sofern ihnen nicht ausdrücklich schriftlich zugestimmt wurde.",
  },
  {
    title: "2. Leistungsbeschreibung",
    body: "Die App stellt Funktionen zur Verfügung, die ausschließlich lokal auf dem Endgerät des Nutzers ausgeführt werden. Sämtliche Datenverarbeitung erfolgt direkt auf dem Gerät des Nutzers. Der Anbieter speichert, verarbeitet oder übermittelt keine personenbezogenen Daten auf eigenen Servern. Der Anbieter behält sich vor, Funktionen der App jederzeit zu ändern, zu erweitern oder einzustellen.",
  },
  {
    title: "3. Datenspeicherung und Datenschutz",
    body: "Alle innerhalb der App eingegebenen oder erzeugten Daten werden ausschließlich lokal auf dem Endgerät des Nutzers gespeichert. Der Anbieter hat keinen Zugriff auf diese Daten und kann diese weder einsehen noch wiederherstellen. Eine automatische Übertragung an externe Server oder Dritte erfolgt nicht. Der Nutzer ist selbst für die Sicherung seiner Daten verantwortlich. Bei einer Deinstallation der App oder einem Gerätewechsel können sämtliche Daten dauerhaft verloren gehen.",
  },
  {
    title: "4. Pflichten des Nutzers",
    body: "Der Nutzer verpflichtet sich, die App ausschließlich im Rahmen der geltenden gesetzlichen Vorschriften zu verwenden. Es ist untersagt, die App missbräuchlich zu nutzen, Sicherheitsmechanismen zu umgehen oder Funktionen der App zu manipulieren.",
  },
  {
    title: "5. Nutzungsrechte",
    body: "Die App wird dem Nutzer ausschließlich zur privaten, nicht übertragbaren Nutzung bereitgestellt. Ohne ausdrückliche Zustimmung des Anbieters ist es nicht gestattet, die App oder Teile hiervon zu vervielfältigen, zu verändern, zu verbreiten, öffentlich zugänglich zu machen oder kommerziell zu nutzen.",
  },
  {
    title: "6. Haftung",
    body: "Die Nutzung der App erfolgt auf eigene Verantwortung des Nutzers. Eine Haftung für Datenverlust, Gerätefehler, Softwarefehler oder sonstige Schäden, die durch die Nutzung der App entstehen, ist ausgeschlossen.",
  },
  {
    title: "7. Verfügbarkeit und Änderungen",
    body: "Der Anbieter übernimmt keine Gewähr für eine jederzeitige, ununterbrochene oder fehlerfreie Verfügbarkeit der App. Wartungsarbeiten, technische Probleme oder Weiterentwicklungen können die Nutzung vorübergehend einschränken. Der Anbieter ist berechtigt, die App jederzeit anzupassen, zu aktualisieren oder einzustellen.",
  },
  {
    title: "8. Änderungen der AGB",
    body: "Der Anbieter behält sich das Recht vor, diese AGB mit Wirkung für die Zukunft zu ändern, sofern dies aus technischen, rechtlichen oder organisatorischen Gründen erforderlich ist. Änderungen werden innerhalb der App veröffentlicht. Die weitere Nutzung der App nach Inkrafttreten der Änderungen gilt als Zustimmung zu den geänderten Bedingungen.",
  },
  {
    title: "9. Schlussbestimmungen",
    body: "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
];

const AGB = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.componentBorder,
        backgroundColor: Colors.dark.componentBackground,
        padding: 16,
      }}
    >
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
          {AGB_SECTIONS.map((section) => (
            <View
              key={section.title}
              style={{
                borderRadius: 12,
                backgroundColor: Colors.dark.optionBgSelected,
                borderColor: Colors.dark.optionBorderSelected,
                borderWidth: 2,
                padding: 16,
              }}
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
