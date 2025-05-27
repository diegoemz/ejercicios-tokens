// src/tasks/tasks.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface'; // ajusta ruta si necesario
import { Request } from 'express';


@ApiTags('tareas')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: CreateTaskDto, description: 'Datos de la nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente.', type: Task })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  create(@Body() createTaskDto: CreateTaskDto, @Req() req:RequestWithUser): Promise<Task> {
    const userId = req.user.userId;
    return this.tasksService.createTask(createTaskDto.titulo, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas.', type: [Task] })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiBody({ type: UpdateTaskDto, description: 'Datos actualizados de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada correctamente', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(+id);
  }
}