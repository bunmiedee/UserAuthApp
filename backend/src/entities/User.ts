import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 }) email!: string;

  @Column({ type: 'varchar', length: 100 }) firstName!: string;
  @Column({ type: 'varchar', length: 100 }) lastName!: string;
  @Column({ type: 'varchar', length: 500, nullable: true }) avatarUrl?: string;

  @Column({ type: 'boolean', default: false }) isActive!: boolean;
  @Column({ type: 'boolean', default: false }) isAdmin!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true }) hashedPassword?: string;

  @Column({ type: 'jsonb', nullable: true }) metadata?: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamp with time zone' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone' }) updatedAt!: Date;
}