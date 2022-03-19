import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubTaskDto } from './dtos/create-sub-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { SubTask } from './sub-task.entity';
import { SubTaskRepository } from './sub-task.repository';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    @InjectRepository(SubTaskRepository)
    private subtaskRepository: SubTaskRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  async createSubTask(
    taskId: number,
    createSubTaskDto: CreateSubTaskDto,
  ): Promise<SubTask> {
    return this.subtaskRepository.createSubTask(taskId, createSubTaskDto);
  }

  async getSubTasksByTaskId(taskId: number): Promise<SubTask[]> {
    return this.subtaskRepository.getSubTasksByTaskId(taskId);
  }
}
