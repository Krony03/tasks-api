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

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateTask(taskId, updateTaskDto);
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

  async updateSubTask(subTaskId: number, updateSubTaskDto: UpdateSubTaskDto) {
    return this.subtaskRepository.updateSubTask(subTaskId, updateSubTaskDto);
  }

  async getSubTasksByTaskId(taskId: number): Promise<SubTask[]> {
    return this.subtaskRepository.getSubTasksByTaskId(taskId);
  }
}
