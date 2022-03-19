import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, details, deadline } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.details = details;
    if (deadline) task.deadline = new Date(deadline);

    return await this.save(task);
  }

  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, details, deadline, isDone } = updateTaskDto;

    const task = await this.findOne(taskId);
    if (title) task.title = title;
    task.details = details;
    if (deadline) task.deadline = new Date(deadline);
    if (isDone) task.isDone = isDone;

    return await this.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.find();
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.findOne(id);
  }
}
