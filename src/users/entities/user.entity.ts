import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @CreateDateColumn({
    name: 'created_at', 
    type: 'timestamptz', 
    default: () => 'CURRENT_TIMESTAMP', 
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at', 
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP', 
  })
  updatedAt: Date;
}