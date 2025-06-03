import { IsEnum } from 'class-validator';
import { InviteStatus } from '../../entities/guild-invite.entity';

export class HandleInviteDto {
  @IsEnum([InviteStatus.ACCEPTED, InviteStatus.REJECTED, InviteStatus.CANCELLED])
  status!: InviteStatus.ACCEPTED | InviteStatus.REJECTED | InviteStatus.CANCELLED;;
}
