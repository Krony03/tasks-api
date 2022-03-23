import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskRepository } from './repository/sub-task.repository';
import { TasksController } from './controller/tasks.controller';
import { TaskRepository } from './repository/tasks.repository';
import { TasksService } from './service/tasks.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, SubTaskRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
