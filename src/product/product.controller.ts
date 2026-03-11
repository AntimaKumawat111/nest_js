import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getAllProduct();
  }

  @Get(':id') // it will take id dynamicly
  getProductsById(@Param('id') id: string) { 
    // in url we get string not number
    return this.productService.getProductById(Number(id)); // we need to change that string into id because we type id as number in controller
  }
}
