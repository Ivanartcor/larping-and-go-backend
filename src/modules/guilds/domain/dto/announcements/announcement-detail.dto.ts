interface AnnouncementDetailDto {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'poll';
  createdAt: Date;
  author: { id: string; username: string } | null;

  /* Sólo si type = poll */
  isClosed?: boolean;
  closeAt?: Date | null;
  showResults?: boolean;
  multiSelect?: boolean;
  maxChoices?: number | null;

  options?: {
    id: string;
    optionText: string;
    votes: number;       // sólo si el usuario puede ver resultados
    percentage: number;  // 0-100, idem
  }[];

  myVotes?: string[];    // optionIds marcados, sólo si poll
}
