import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    Check,
} from 'typeorm';
import {
    Length,
    IsEnum,
    IsOptional,
    IsBoolean,
    Min,
} from 'class-validator';

import { Guild } from './guild.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { Character } from '../../../characters/domain/entities/character.entity';
import { GuildPollOption } from './guild-poll-option.entity';


export enum AnnouncementType {
    GENERAL = 'general',
    POLL = 'poll',
}

@Entity('guild_announcements')
@Index('ix_ga_guild_created', ['guild', 'createdAt'])
@Index('ix_ga_type', ['type'])
@Check(`(
    (type = 'poll'    AND close_at IS NOT NULL) OR
    (type = 'general' AND close_at IS NULL)
  )`)
export class GuildAnnouncement {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /* -------------------- Relaciones -------------------- */

    @ManyToOne(() => Guild, (g) => g.announcements, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild!: Guild;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'author_user_id' })
    authorUser?: User;

    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'author_character_id' })
    authorCharacter?: Character;

    @OneToMany(() => GuildPollOption, (o) => o.announcement, { cascade: true })
    pollOptions?: GuildPollOption[];

    /* -------------------- Datos principales -------------- */

    @Column({ length: 120 })
    @Length(2, 120)
    title!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'enum', enum: AnnouncementType })
    @IsEnum(AnnouncementType)
    type!: AnnouncementType;

    @Column({ name: 'close_at', type: 'timestamptz', nullable: true })
    @IsOptional()
    closeAt?: Date | null; // sólo válido para polls

    @Column({ name: 'show_results', default: true })
    @IsBoolean()
    showResults!: boolean;

    @Column({ name: 'multi_select', default: false })
    @IsBoolean()
    multiSelect!: boolean;

    @Column({ name: 'max_choices', type: 'int', nullable: true })
    @IsOptional()
    @Min(2)
    maxChoices?: number | null;

    //flag
    @Column({ name: 'is_closed', default: false })
    @IsBoolean()
    isClosed!: boolean;

    //El resto de la entidad permanece igual; la restricción se valida en DTO + servicio.
    /*
 Validación en la capa de servicio
Si multi_select = false → se conserva la lógica original (“un voto por anuncio”).

Si multi_select = true →

Contar votos existentes del usuario para ese anuncio.

Si max_choices no es NULL, impedir que el total supere ese número.
    */

    /* -------------------- Metadatos ---------------------- */

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
}
