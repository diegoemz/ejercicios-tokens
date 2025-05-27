import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Task, User]),
        UsersModule,
    ],
    providers:[TasksService],
    controllers:[TasksController]
})
export class TasksModule {}
