import { Controller, Post, Get, UseGuards, Body  } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/JwtAuthGuard";
@Controller('productos')
export class ProductsController{
    //defino la ruta publica
    @Get()
    findAll(){
        return 'esta va a ser la lista de los productos'
    }

    //defino la ruta privada
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() Body: any){
        return{
            message: 'producto creado exitosamente',
            data: Body,
        };
    }
}