import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,
    JoinColumn, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert,
} from 'typeorm';
import { Length, IsOptional, IsBoolean } from 'class-validator';
import { User } from '../../../users/domain/entities/user.entity';
import { CharacterProperty } from './character-property.entity';

@Entity('characters')
@Index('ux_char_user_name', ['user', 'name'], { unique: true })
@Index('ux_char_slug', ['slug'], { unique: true })
export class Character {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /* Relaciones */
    @ManyToOne(() => User, (u) => u.characters, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => CharacterProperty, (p) => p.character, { cascade: true })
    properties?: CharacterProperty[];

    /* Datos básicos */
    @Column({ length: 60 })
    @Length(2, 60)
    name!: string;

    @Column({ length: 80, unique: true })
    slug!: string;

    @Column({ name: 'avatar_url', type: 'text', nullable: true })
    @IsOptional()
    avatarUrl?: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    bio?: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    backstory?: string;

    @Column({ type: 'jsonb', default: {} })
    attributes!: Record<string, unknown>;

    /* Flags */
    @Column({ default: true })
    @IsBoolean()
    visibility!: boolean; // público/privado

    @Column({ name: 'is_active', default: true })
    @IsBoolean()
    isActive!: boolean;   // soft‑delete

    /* Timestamps */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    /* Hooks */
    @BeforeInsert()
    generateSlug() {
        if (!this.slug) {
            // slug simplificado: lower, espacios→guiones
            this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
        }
    }
}
