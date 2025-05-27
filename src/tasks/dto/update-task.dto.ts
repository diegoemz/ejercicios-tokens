import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ 
    example: 'Completar informe mensual actualizado', 
    description: 'Título actualizado de la tarea',
    required: false
  })
  titulo?: string;

  @ApiProperty({ 
    example: 2, 
    description: 'ID del usuario al que se reasigna la tarea',
    required: false
  })
  userId?: number;

  @ApiProperty({ 
    example: true, 
    description: 'Estado de completado de la tarea',
    required: false
  })
  completada?: boolean;
}