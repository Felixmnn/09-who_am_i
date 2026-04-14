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

export type answer = {
  questionId: string;
  name: string;
  difficulty: string;
  correct: boolean;
  byParticipant: number;
};

export type gameResult = {
  dateTime: string;
  participants: number[];
  answers: answer[];
  gameResults: participantResult[];
};

export type gameResultPlayer = {
  participantId: number;
  pointsEarned: number;
};

export type currentGame = {
  dateTime: Date;
  participants: number[];
  kategorys: string[];
  roundDuration: number;
  answers: answer[];
  gameResults: gameResultPlayer[];
};
