import { Controller, Post, Get, Param, Body, Put, Delete, ForbiddenException, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(dto.nombre, dto.email, dto.password);

    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    delete(
        @Param('id') id: string,
        @Req() req: RequestWithUser, 
    ): Promise<void> {
        if (id !== req.user.userId.toString()) {
            throw new ForbiddenException('No tienes permiso para eliminar este usuario');
        }
        return this.usersService.deleteUser(+id);
    }
}

