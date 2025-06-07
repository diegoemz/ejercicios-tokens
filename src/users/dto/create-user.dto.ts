import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Perez', description: 'Nombre completo del usuario' })
    nombre: string;

    @ApiProperty({ example: 'juan@example.com', description: 'Correo electrónico del usuario' })
    email: string;

    @ApiProperty({ example: '1234', description: 'Contraseña del usuario' })
    password: string;

}