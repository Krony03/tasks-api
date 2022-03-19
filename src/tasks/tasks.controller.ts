import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubTaskDto } from './dtos/create-sub-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
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

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post(':id/sub-tasks')
  async createSubTask(
    @Param('id') id: number,
    @Body() createSubTaskDto: CreateSubTaskDto,
  ): Promise<SubTask> {
    return this.tasksService.createSubTask(id, createSubTaskDto);
  }

  @Get(':id/sub-tasks')
  async getSubTasksByTaskId(@Param('id') id: number): Promise<SubTask[]> {
    return this.tasksService.getSubTasksByTaskId(id);
  }
}
