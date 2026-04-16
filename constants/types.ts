// User Kategorien bitte global von config.ts beziehen @felix
export type users = {
  id: number;
  name: string;
  points: number;
  history: string;
  politics: string;
  sports: string;
  media: string;
  science: string;
};

export type name = {
  id: string;
  name: string;
  difficulty: string;
};

export type question = {
  category: string;
  id: string;
  name: string;
  difficulty: string;
  correct: boolean;
};

export type round = {
  rid: number;
  participant: number;
  questions: question[];
};

export type participantResult = {
  participantId: number;
  pointsEarned: number;
};

export type gameResult = {
  dateTime: string;
  participants: number[];
  rounds: round[];
  gameResults: participantResult[];
};
