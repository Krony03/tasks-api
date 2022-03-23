import { User } from 'src/users/model/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../model/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, details, deadline } = createTaskDto;

    const task = new Task();
    task.user = user.uuid;
    task.title = title;
    task.details = details;
    if (deadline) task.deadline = new Date(deadline);

    return await this.save(task);
  }

  async updateTask(
    id: number,
    user: User,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, details, deadline, isDone } = updateTaskDto;

    const task = await this.findOne({ id: id, user: user.uuid });
    if (title) task.title = title;
    task.details = details;
    if (deadline) task.deadline = new Date(deadline);
    if (isDone != null && isDone != undefined) task.isDone = isDone;

    return await this.save(task);
  }

  async getTasks(user: User): Promise<Task[]> {
    return await this.find({ user: user.uuid });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    return await this.findOne({ id: id, user: user.uuid });
  }
}
