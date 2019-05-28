import { Injectable } from '@angular/core';
import { StaticSource } from './static.datasource';
import { Product } from './product.model';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private catgories: string[] = [];

  constructor(private dataSource: StaticSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      this.catgories = data.map(p => p.category)


        .filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getProducts(catgory: string = null): Product[] {
    return this.products.filter(p => p.category === null || p.category === catgory);
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id === id);
  }

  getCategories(): string[] {
    return this.catgories;
  }

}
