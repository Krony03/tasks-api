import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, details, deadline } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.details = details;
    if (deadline) task.deadline = new Date(deadline);

    return await task.save();
  }

  async getTasks(): Promise<Task[]> {
    return await this.find();
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.findOne(id);
  }
}
