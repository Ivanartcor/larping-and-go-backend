import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
    Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { IsIn, IsOptional, IsInt, Min } from 'class-validator';

@Entity('character_properties')
@Index('ux_prop_char_key', ['character', 'key'], { unique: true })
export class CharacterProperty {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /* Relación */
    @ManyToOne(() => Character, (c) => c.properties, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'character_id' })
    character!: Character;

    /* Metadatos */
    @Column({ length: 20 })
    @IsIn(['physical', 'social', 'general', 'relation', 'custom'])
    group!: string;

    @Column({ length: 50 })
    key!: string;

    @Column({ type: 'jsonb' })
    value!: unknown; // string | number | boolean | array

    @Column({ name: 'value_type', length: 10 })
    @IsIn(['text', 'number', 'boolean', 'list'])
    valueType!: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;

    /* Timestamps */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
}
