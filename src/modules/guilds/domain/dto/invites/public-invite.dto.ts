import { InviteStatus, InviteType } from "../../entities/guild-invite.entity";

export interface PublicInviteDto {
  id: string;
  type: InviteType;
  status: InviteStatus;
  expiresAt: Date | null;
  createdAt: Date;
  sender: {
    id: string;
    username: string;
    displayName: string | null;
  };
  target?: {
    id: string;
    username: string;
    displayName: string | null;
  };
  email: string | null;
}
