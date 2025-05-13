import {
    Entity, ManyToOne, JoinColumn, PrimaryColumn,
    Index, CreateDateColumn, UpdateDateColumn,
    Column,
  } from 'typeorm';
  import { IsEnum, IsOptional } from 'class-validator';
  
  import { GlobalEvent } from './global-event.entity';
  import { User } from '../../../users/domain/entities/user.entity';
  import { Character } from '../../../characters/domain/entities/character.entity';
  
  export enum AttendanceStatus {
    CONFIRMED  = 'confirmed',
    CANCELLED  = 'cancelled',
    WAITLISTED = 'waitlisted',
  }
  
  @Entity('global_event_attendance')
  @Index('ix_gea_event_status', ['event'], { where: `"status" = 'confirmed'"` })
  @Index('ix_gea_user', ['user', 'changedAt'])
  export class GlobalEventAttendance {
    /* --- Clave primaria compuesta --- */
    @PrimaryColumn('uuid', { name: 'event_id' })
    eventId!: string;
  
    @PrimaryColumn('uuid', { name: 'user_id' })
    userId!: string;
  
    /* --- Relaciones --- */
  
    @ManyToOne(() => GlobalEvent, (e) => e.attendances, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event!: GlobalEvent;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'character_id' })
    @IsOptional()
    character?: Character;
  
    /* --- Estado --- */
    @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.CONFIRMED })
    @IsEnum(AttendanceStatus)
    status!: AttendanceStatus;
  
    @Column({ name: 'changed_at', type: 'timestamptz', default: () => 'now()' })
    changedAt!: Date;
  
    /* --- Metadatos --- */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  