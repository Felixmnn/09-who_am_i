import { users } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";

export function stopGame() {
  console.log("Game stopped");
}

export function startGame({
  participants,
  timeLimit,
  kategorys,
}: {
  participants: users[];
  timeLimit: number;
  kategorys: string[];
}) {
  console.log("Game started");
}

export function getUserFromId(id: number): users | null {
  const { users } = useGlobalContext();

  const user = users.find((user: users) => user.id === id);
  return user || null;
}
