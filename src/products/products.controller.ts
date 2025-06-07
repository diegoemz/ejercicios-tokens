import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';

@Controller('productos')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: Omit<Product, 'id'>): Product {
    return this.productService.create(body);
  }
}
