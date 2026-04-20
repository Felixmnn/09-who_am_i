import { name, users } from "@/constants/types";

export function algorithm({
  names,
  user,
  setNextName,
  alreadyGuessedNames,
  currentGame,
}: {
  names: name[];
  user: users | null;
  setNextName: (name: name | null) => void;
  alreadyGuessedNames: name[];
  currentGame: any;
}) {
  console.log("UserID in algorithm:", user);
  return names[0] || null;
}
