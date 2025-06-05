import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    Check,
  } from 'typeorm';
  import {
    Length,
    IsHexColor,
    IsInt,
    Min,
    IsBoolean,
  } from 'class-validator';
  
  import { Guild } from './guild.entity'; 
  
  /** Mapa de bits para permissions (debe coincidir con la tabla) */
  export enum GuildPermission {
    EDIT_INFO        = 1 << 0,
    MANAGE_MEMBERS   = 1 << 1,
    MANAGE_ROLES     = 1 << 2,
    POST_ANNOUNCEMENT= 1 << 3,
    CREATE_EVENTS    = 1 << 4,
    CHAT             = 1 << 5,
    CREATE_ROLES     = 1 << 6,
    ALL              = (1 << 7) - 1, // 127
  }
  
  @Entity('guild_roles')
  @Index('ux_role_name', ['guild', 'name'], { unique: true })
  @Index('ux_role_position', ['guild', 'position'], { unique: true })
  @Index('ux_role_one_leader', ['guild'], {
    unique: true,
    where: '"is_leader" = TRUE',
  })
  @Check(`"position" >= 0`)
  export class GuildRole {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* -------------------------------------------------------------- */
    /* Relaciones                                                     */
    /* -------------------------------------------------------------- */
    @ManyToOne(() => Guild, (g) => g.roles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'guild_id' })
    guild!: Guild;
  
    /* -------------------------------------------------------------- */
    /* Datos principales                                              */
    /* -------------------------------------------------------------- */
    @Column({ length: 40 })
    @Length(2, 40)
    name!: string;
  
    @Column({ length: 7 })
    @IsHexColor()
    color!: string;           // "#aabbcc"
  
    @Column({ nullable: true })
    icon?: string;            // nombre de icono (FontAwesome, etc.)
  
    /** 0 significa nivel superior (rol líder) */
    @Column()
    @IsInt()
    @Min(0)
    position!: number;
  
    /** Bit-mask de permisos */
    @Column({ type: 'int', default: 0 })
    permissions!: number;
  
    /** Marca única para el rol Líder */
    @Column({ name: 'is_leader', default: false })
    @IsBoolean()
    isLeader!: boolean;
  
    /* -------------------------------------------------------------- */
    /* Metadatos                                                      */
    /* -------------------------------------------------------------- */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  
    /* -------------------------------------------------------------- */
    /* Utilidades                                                     */
    /* -------------------------------------------------------------- */
  
    hasPermission(bit: GuildPermission): boolean {
      return (this.permissions & bit) === bit;
    }
  
    /** Añade permisos preservando los existentes */
    grant(...bits: GuildPermission[]) {
      bits.forEach((b) => (this.permissions |= b));
    }
  
    /** Revoca permisos seleccionados */
    revoke(...bits: GuildPermission[]) {
      bits.forEach((b) => (this.permissions &= ~b));
    }
  }
  