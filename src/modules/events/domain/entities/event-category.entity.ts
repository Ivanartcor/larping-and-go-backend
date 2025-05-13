import {
    Entity, PrimaryGeneratedColumn, Column, Index,
    CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert,
  } from 'typeorm';
  import { Length, IsHexColor, IsOptional, IsInt, Min } from 'class-validator';
  import slugify from 'slugify';
  
  import { GlobalEvent } from './global-event.entity';
  
  @Entity('event_categories')
  @Index('ux_ec_name', ['name'], { unique: true })
  @Index('ux_ec_slug', ['slug'], { unique: true })
  @Index('ux_ec_pos',  ['position'], { unique: true })
  export class EventCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ length: 40 })
    @Length(2, 40)
    name!: string;
  
    @Column({ length: 60, unique: true })
    slug!: string;
  
    @Column({ length: 7 })
    @IsHexColor()
    color!: string;          // "#3498db"
  
    @Column({ type: 'text', nullable: true })
    @IsOptional()
    description?: string;
  
    @Column()
    @IsInt() @Min(0)
    position!: number;
  
    /* --- Relaciones --- */
    @OneToMany(() => GlobalEvent, (e) => e.category)
    events?: GlobalEvent[];
  
    /* --- Metadatos --- */
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;
  
    /* --- Hook para slug --- */
    @BeforeInsert()
    generateSlug() {
      if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true }).slice(0, 60);
      }
    }
  }
  