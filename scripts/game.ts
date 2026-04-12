import { users } from "@/constants/types";

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
