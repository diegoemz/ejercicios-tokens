import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  create(product: Omit<Product, 'id'>): Product {
    const nuevo: Product = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(nuevo);
    return nuevo;
  }
}
