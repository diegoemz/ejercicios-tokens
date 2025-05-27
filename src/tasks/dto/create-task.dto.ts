import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ 
    example: 'Completar informe mensual', 
    description: 'Título descriptivo de la tarea' 
  })
  @IsString()
  titulo: string;
}
