import { EntityRepository, Repository } from 'typeorm';
import { CreateSubTaskDto } from './dtos/create-sub-task.dto';
import { SubTask } from './sub-task.entity';

@EntityRepository(SubTask)
export class SubTaskRepository extends Repository<SubTask> {
  async createSubTask(
    taskId: number,
    createSubTaskDto: CreateSubTaskDto,
  ): Promise<SubTask> {
    const { title } = createSubTaskDto;

    const subTask = new SubTask();
    subTask.title = title;
    subTask.task = taskId;

    return await this.save(subTask);
  }

  async getSubTasksByTaskId(taskId: number): Promise<SubTask[]> {
    return await this.find({ task: taskId });
  }
}
