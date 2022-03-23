import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubTaskDto } from '../dtos/create-sub-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateSubTaskDto } from '../dtos/update-sub-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { SubTask } from '../model/sub-task.entity';
import { SubTaskRepository } from '../repository/sub-task.repository';
import { Task } from '../model/task.entity';
import { TaskRepository } from '../repository/tasks.repository';
import { User } from 'src/users/model/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    @InjectRepository(SubTaskRepository)
    private subtaskRepository: SubTaskRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto, user: User) {
    return this.taskRepository.updateTask(taskId, user, updateTaskDto);
  }

  async getTasks(user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  async createSubTask(
    taskId: number,
    user: User,
    createSubTaskDto: CreateSubTaskDto,
  ): Promise<SubTask> {
    const task = await this.taskRepository.getTaskById(taskId, user);
    return this.subtaskRepository.createSubTask(task, createSubTaskDto);
  }

  async updateSubTask(subTaskId: number, updateSubTaskDto: UpdateSubTaskDto) {
    return this.subtaskRepository.updateSubTask(subTaskId, updateSubTaskDto);
  }

  async getSubTasksByTaskId(taskId: number, user: User): Promise<SubTask[]> {
    const task = await this.taskRepository.getTaskById(taskId, user);
    return this.subtaskRepository.getSubTasksByTaskId(task);
  }
}
