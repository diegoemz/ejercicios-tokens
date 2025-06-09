import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('configuración')
@Controller('settings')
export class SettingsController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Área privada de configuración' })
  @Get()
  getSettings(@Request() req) {
    const user = req.user;

    if (!user) {
      return { mensaje: 'Usuario no autenticado' };
    }

    return {
      mensaje: `Hola ${user.name}, esta es tu área privada de configuración.`,
      datos: user,
    };
  }
}
