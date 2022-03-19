import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSubTaskDto } from './dtos/create-sub-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateSubTaskDto } from './dtos/update-sub-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { SubTask } from './sub-task.entity';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: number): Promise<Task> {
    return this.tasksService.getTaskById(taskId);
  }

  @Post(':id/sub-tasks')
  async createSubTask(
    @Param('id') taskId: number,
    @Body() createSubTaskDto: CreateSubTaskDto,
  ): Promise<SubTask> {
    return this.tasksService.createSubTask(taskId, createSubTaskDto);
  }

  @Put(':id/sub-tasks/:subTaskId')
  async updateSubTask(
    @Param('subTaskId') subTaskId: number,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
  ): Promise<SubTask> {
    return this.tasksService.updateSubTask(subTaskId, updateSubTaskDto);
  }

  @Get(':id/sub-tasks')
  async getSubTasksByTaskId(@Param('id') taskId: number): Promise<SubTask[]> {
    return this.tasksService.getSubTasksByTaskId(taskId);
  }
}
