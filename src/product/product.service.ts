import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'phone', price: 30000 },
    { id: 2, name: 'phone2', price: 60000 },
    { id: 3, name: 'phone3', price: 90000 },
  ];

  getAllProduct() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((products) => products.id === id);
  }
}
