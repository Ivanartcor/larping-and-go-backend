export interface PollOptionResult {
  id: string;
  optionText: string;
  votes: number;
  percentage: number;   // 0-100 (una cifra)
}

export interface PollResultsDto {
  id: string;
  title: string;
  closeAt: Date | null;
  isClosed: boolean;
  totalVotes: number;
  options: PollOptionResult[];
  myVotes: string[];            // optionIds que marcó el solicitante
}