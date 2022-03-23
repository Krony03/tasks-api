import { User } from 'src/users/model/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseTask } from './base-task';
import { Task } from './task.entity';

@Entity()
export class SubTask extends BaseTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @ManyToOne(() => Task, (task) => task.subTasks)
  task: Task;

  @ManyToOne(() => User)
  user: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
