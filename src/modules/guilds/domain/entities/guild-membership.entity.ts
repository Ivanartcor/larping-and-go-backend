import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    Check,
  } from 'typeorm';
  import {
    IsEnum,
    IsOptional,
    IsUUID,
  } from 'class-validator';
  
  import { User } from '../../../users/domain/entities/user.entity';
  import { Guild } from './guild.entity'; 
  import { GuildRole } from './guild-role.entity';
  
  /** Enum TypeScript, debe coincidir con el ENUM SQL */
  export enum MembershipStatus {
    PENDING = 'pending',
    ACTIVE  = 'active',
    KICKED  = 'kicked',
    LEFT    = 'left',
  }
  
  @Entity('guild_memberships')
  @Index('ux_gm_user_guild', ['user', 'guild'], { unique: true })
  @Index('ix_gm_status', ['status'])
  @Index('ix_gm_guild_active', ['guild'], { where: `"status" = 'active'` })
  @Check(`"joined_at" IS NOT NULL OR status = 'pending'`)
  export class GuildMembership {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* ---------------------------------------------------------------- */
    /* Relaciones                                                       */
    /* ---------------------------------------------------------------- */
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    @ManyToOne(() => Guild, (g) => g.memberships, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild!: Guild;
  
    @ManyToOne(() => GuildRole, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'role_id' })
    role!: GuildRole;
  
    /* ---------------------------------------------------------------- */
    /* Datos de membresía                                               */
    /* ---------------------------------------------------------------- */
  
    @Column({ type: 'enum', enum: MembershipStatus })
    @IsEnum(MembershipStatus)
    status!: MembershipStatus;
  
    /** Usuario que invitó a este miembro (solo si `status = 'pending'`) */
    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'invited_by_id' })
    @IsOptional()
    invitedBy?: User;
  
    /** Fecha de aceptación / unión; NULL si está en 'pending' */
    @Column({ name: 'joined_at', type: 'timestamptz', nullable: true })
    joinedAt?: Date;
  
    /** Fecha de salida o expulsión; NULL si sigue activo o pendiente */
    @Column({ name: 'left_at', type: 'timestamptz', nullable: true })
    @IsOptional()
    leftAt?: Date;
  
    /* ---------------------------------------------------------------- */
    /* Metadatos                                                        */
    /* ---------------------------------------------------------------- */
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  
    /* ---------------------------------------------------------------- */
    /* Hooks de integridad                                              */
    /* ---------------------------------------------------------------- */
  
    @BeforeInsert()
    ensureJoinedAt() {
      if (this.status === MembershipStatus.ACTIVE && !this.joinedAt) {
        this.joinedAt = new Date();
      }
    }
  }
  