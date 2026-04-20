import { LevelCategory } from "@/constants/config";
import { name, users } from "@/constants/types";

/** Maps a name's id-prefix to a LevelCategory, or null for custom names. */
function categoryFromId(id: string): LevelCategory | null {
  if (id.startsWith("sp")) return "sports";
  if (id.startsWith("sc")) return "science";
  if (id.startsWith("h")) return "history";
  if (id.startsWith("p")) return "politics";
  if (id.startsWith("m")) return "media";
  return null; // custom
}

/** Maps a user's skill level to the preferred name difficulty. */
const SKILL_TO_DIFFICULTY: Record<string, string> = {
  LOW: "EASY",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

/**
 * In 25 % of all calls a random "surprise" difficulty is used instead of the
 * user's preferred one. This ensures players occasionally see names that are
 * easier or harder than their usual level.
 */
const SURPRISE_CHANCE = 0.25;
const DIFFICULTY_ORDER = ["EASY", "MEDIUM", "HIGH"] as const;

function pickPreferredDifficulty(userLevel: string): string {
  if (Math.random() < SURPRISE_CHANCE) {
    // Pick any difficulty that differs from the normal match
    const normal = SKILL_TO_DIFFICULTY[userLevel] ?? "MEDIUM";
    const others = DIFFICULTY_ORDER.filter((d) => d !== normal);
    return others[Math.floor(Math.random() * others.length)];
  }
  return SKILL_TO_DIFFICULTY[userLevel] ?? "MEDIUM";
}

/**
 * Scores a name for a given user.
 * Higher score = better match.
 *   +2  difficulty matches the chosen preferred difficulty for that category
 *   +1  difficulty is one step away
 *    0  two steps away
 *   +1  bonus if the name hasn't been guessed yet
 */
function scoreNameForUser(
  candidate: name,
  user: users,
  alreadyGuessedNames: name[],
): number {
  let score = 0;

  const category = categoryFromId(candidate.id);

  if (category && user[category]) {
    const preferred = pickPreferredDifficulty(user[category]);
    const prefIdx = DIFFICULTY_ORDER.indexOf(
      preferred as (typeof DIFFICULTY_ORDER)[number],
    );
    const candIdx = DIFFICULTY_ORDER.indexOf(
      candidate.difficulty as (typeof DIFFICULTY_ORDER)[number],
    );
    const distance = Math.abs(prefIdx - candIdx);

    if (distance === 0) score += 2;
    else if (distance === 1) score += 1;
    // distance 2 → 0 points
  } else {
    // Custom or unknown category: neutral score
    score += 1;
  }

  const alreadyGuessed = alreadyGuessedNames.some((g) => g.id === candidate.id);
  if (!alreadyGuessed) score += 1;

  return score;
}

/**
 * Returns the best next name for the given user from the available list.
 * Skips names[0] (the currently shown name) and picks from names[1..].
 * Falls back to names[1] if no user is provided.
 */
export function getNextName({
  names,
  user,
  alreadyGuessedNames,
}: {
  names: name[];
  user: users | null;
  alreadyGuessedNames: name[];
}): name | null {
  // Need at least two names (index 0 is currently displayed)
  const candidates = names.slice(1);
  if (candidates.length === 0) return null;

  if (!user) return candidates[0];

  let bestName = candidates[0];
  let bestScore = scoreNameForUser(candidates[0], user, alreadyGuessedNames);

  for (let i = 1; i < candidates.length; i++) {
    const score = scoreNameForUser(candidates[i], user, alreadyGuessedNames);
    if (score > bestScore) {
      bestScore = score;
      bestName = candidates[i];
    }
  }

  return bestName;
}
