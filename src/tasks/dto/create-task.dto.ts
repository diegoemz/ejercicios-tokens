import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto{
    @ApiProperty({example: 'Tarea 1', description: 'Nombre de la tarea'})
    titulo: string;

    @ApiProperty({example: true, description:'Tarea completada'})
    completada:boolean;
}