import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';

import { User } from '../../../users/domain/entities/user.entity';
import { Character } from '../../../characters/domain/entities/character.entity';
import { GuildInternalEvent } from './guild-internal-event.entity';

export enum AttendanceStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Entity('guild_event_attendance')
@Index('ux_gatt_user_event', ['event', 'user'], { unique: true })
@Index('ix_gatt_event_confirmed', ['event'], { where: `"status" = 'confirmed'` })
export class GuildEventAttendance {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /* ------------ Relaciones -------------- */

    @ManyToOne(() => GuildInternalEvent, (e) => e.attendances, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event!: GuildInternalEvent;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'character_id' })
    character?: Character; // máscara con la que confirma

    /* ------------ Estado ------------------- */

    @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.CONFIRMED })
    @IsEnum(AttendanceStatus)
    status!: AttendanceStatus;

    /** Último cambio de estado (confirmar / cancelar) */
    @Column({ name: 'changed_at', type: 'timestamptz' })
    changedAt!: Date;

    /* ------------ Metadatos ---------------- */

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;



    /*Lógica:
1. Confirmar asistencia

    Si no existe fila, crear con status='confirmed', changedAt=now().

    Si existe y estaba cancelled, cambiar a confirmed y actualizar changedAt.

2. Cancelar asistencia

    Cambiar status a cancelled, actualizar changedAt.

3. Aforo

    Antes de confirmar, comparar attendee_count (confirmados) con capacity; denegar si se supera.

    Tras cada cambio, disparar trigger o servicio que recalcula attendee_count.
     */
}
