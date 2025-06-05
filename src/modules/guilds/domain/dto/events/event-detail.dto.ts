import { GuildInternalEvent } from "../../entities/guild-internal-event.entity";

interface EventDetailDto {
  event : GuildInternalEvent;            // entidad completa
  confirmedPreview: {
    total : number;                      // confirmados totales
    sample: {
      userId     : string;
      username   : string;
      character?: { id:string; name:string; avatarUrl?:string };
    }[];
  };
}
