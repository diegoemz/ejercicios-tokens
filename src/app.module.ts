import { Module } from '@nestjs/common';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database:'apicurso',
      entities: [User, Task, Product],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
