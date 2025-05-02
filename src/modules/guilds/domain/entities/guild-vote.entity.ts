import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn,
  } from 'typeorm';
  import { User } from '../../../users/domain/entities/user.entity';
  import { Character } from '../../../characters/domain/entities/character.entity';
  import { GuildAnnouncement } from './guild-announcement.entity';
  import { GuildPollOption } from './guild-poll-option.entity';
  
  @Entity('guild_votes')
  @Index('ux_gv_one_vote_per_option', ['pollOption', 'user'], { unique: true })
  export class GuildVote {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* Relaciones principales */
    @ManyToOne(() => GuildAnnouncement, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'announcement_id' })
    announcement!: GuildAnnouncement;
  
    @ManyToOne(() => GuildPollOption, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'poll_option_id' })
    pollOption!: GuildPollOption;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    /** Personaje con el que se registra el voto (máscara) */
    @ManyToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'character_id' })
    character?: Character;
  
    /* Metadatos */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  }
  