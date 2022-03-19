import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskRepository } from './sub-task.repository';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, SubTaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
