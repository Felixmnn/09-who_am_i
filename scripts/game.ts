import { users } from "@/constants/types";

export function getUserFromId(
  id: number | undefined,
  userList: users[], // Grund: userList wird jetzt als Parameter übergeben, damit die Funktion unabhängig vom globalen Kontext ist und immer mit der aktuellen User-Liste arbeitet.
): users | null {
  if (id === undefined) {
    return null;
  }

  const user = userList.find((user: users) => user.id === id);
  return user || null;
}
