import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Product } from './products/product.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1989',
      database: 'apicurso',
      entities: [User, Task, Product],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'clave-secreta',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
