import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user-decorator';
import { User } from 'src/users/model/user.entity';
import { CreateSubTaskDto } from '../dtos/create-sub-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateSubTaskDto } from '../dtos/update-sub-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { SubTask } from '../model/sub-task.entity';
import { Task } from '../model/task.entity';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTask(taskId, updateTaskDto, user);
  }

  @Get()
  async getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

  @Get(':id')
  async getTaskById(
    @Param('id') taskId: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(taskId, user);
  }

  @Post(':id/sub-tasks')
  async createSubTask(
    @Param('id') taskId: number,
    @Body() createSubTaskDto: CreateSubTaskDto,
    @GetUser() user: User,
  ): Promise<SubTask> {
    return this.tasksService.createSubTask(taskId, user, createSubTaskDto);
  }

  @Patch(':id/sub-tasks/:subTaskId')
  async updateSubTask(
    @Param('subTaskId') subTaskId: number,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
  ): Promise<SubTask> {
    return this.tasksService.updateSubTask(subTaskId, updateSubTaskDto);
  }

  @Get(':id/sub-tasks')
  async getSubTasksByTaskId(
    @Param('id') taskId: number,
    @GetUser() user: User,
  ): Promise<SubTask[]> {
    return this.tasksService.getSubTasksByTaskId(taskId, user);
  }
}
