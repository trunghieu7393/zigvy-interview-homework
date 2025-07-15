import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskStatus } from 'src/constants/types';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  due: Date;

  @Column({ default: TaskStatus.todo })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @CreateDateColumn()
    createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}