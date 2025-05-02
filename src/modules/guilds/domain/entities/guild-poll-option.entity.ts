import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn,
  } from 'typeorm';
  import { IsInt, Min, Length } from 'class-validator';
  import { GuildAnnouncement } from './guild-announcement.entity';
  
  @Entity('guild_poll_options')
  @Index('ix_gpo_announcement', ['announcement', 'position'])
  export class GuildPollOption {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    /* Relaciones */
    @ManyToOne(() => GuildAnnouncement, (a) => a.pollOptions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'announcement_id' })
    announcement!: GuildAnnouncement;
  
    /* Datos */
    @Column({ name: 'option_text', length: 120 })
    @Length(1, 120)
    optionText!: string;
  
    @Column()
    @IsInt()
    @Min(0)
    position!: number;
  
    @Column({ name: 'votes_count', default: 0 })
    votesCount!: number;
  
    /* Metadatos */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  }
  