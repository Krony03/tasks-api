import { User } from 'src/users/model/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseTask } from './base-task';
import { SubTask } from './sub-task.entity';

@Entity()
export class Task extends BaseTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  details?: string;

  @Column({ type: 'timestamptz', nullable: true })
  deadline?: Date;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: string;

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  subTasks: SubTask[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
