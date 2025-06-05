import {
    Injectable, Inject, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { IGuildRepository } from '../../ports/i-guild.repository';
import { CreateInternalEventDto } from '../../../domain/dto/events/create-internal-event.dto';
import {
    GuildInternalEvent, EventStatus,
} from '../../../domain/entities/guild-internal-event.entity';
import { GuildPermission } from '../../../domain/entities/guild-role.entity';

@Injectable()
export class CreateInternalEventUseCase {
    constructor(
        @Inject('GUILD_REPO') private readonly guilds: IGuildRepository,
    ) { }

    async execute(
        guildId: string,
        dto: CreateInternalEventDto,
        authorId: string,
        characterId: string | undefined,
        rolePerms: number,
    ) {
        /* 1️⃣ Permisos */
        if ((rolePerms & GuildPermission.CREATE_EVENTS) === 0) {
            throw new ForbiddenException('CREATE_EVENTS requerido');
        }

        /* 2️⃣ Validar fechas y datos */
        const start = new Date(dto.startAt);
        const end = new Date(dto.endAt);
        if (end <= start) throw new BadRequestException('endAt debe ser posterior a startAt');

        if (dto.latitude !== undefined && (dto.latitude < -90 || dto.latitude > 90))
            throw new BadRequestException('Latitud inválida (-90..90)');
        if (dto.longitude !== undefined && (dto.longitude < -180 || dto.longitude > 180))
            throw new BadRequestException('Longitud inválida (-180..180)');


        /* 3️⃣ Crear entidad */
        const ev = new GuildInternalEvent();
        ev.guild = { id: guildId } as any;
        ev.creatorUser = { id: authorId } as any;
        ev.creatorCharacter = characterId ? { id: characterId } as any : undefined;

        ev.title = dto.title;
        ev.description = dto.description;
        ev.startAt = start;
        ev.endAt = end;
        ev.locationText = dto.locationText;
        ev.latitude = dto.latitude;
        ev.longitude = dto.longitude;
        ev.capacity = dto.capacity;
        ev.bannerUrl = dto.bannerUrl;
        ev.highlighted = dto.highlighted ?? false;
        ev.status = EventStatus.SCHEDULED;
        ev.attendeeCount = 0;

        /* 4️⃣ Persistir */
        return this.guilds.createInternalEvent(ev);
    }
}