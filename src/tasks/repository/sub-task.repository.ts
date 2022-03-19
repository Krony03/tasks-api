import { EntityRepository, Repository } from 'typeorm';
import { CreateSubTaskDto } from '../dtos/create-sub-task.dto';
import { UpdateSubTaskDto } from '../dtos/update-sub-task.dto';
import { SubTask } from '../model/sub-task.entity';

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

  async updateSubTask(subTaskId: number, updateSubTaskDto: UpdateSubTaskDto) {
    const { title, isDone } = updateSubTaskDto;

    const subTask = await this.findOne(subTaskId);
    if (title) subTask.title = title;
    if (isDone) subTask.isDone = isDone;

    return await this.save(subTask);
  }

  async getSubTasksByTaskId(taskId: number): Promise<SubTask[]> {
    return await this.find({ task: taskId });
  }
}
