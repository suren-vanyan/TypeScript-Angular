import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

@Component({
    selector: 'store',
    templateUrl: 'store.component.html'
})

export class StoreComponent {
    constructor(private repositroy: ProductRepository) {

    }

    getProducts(): Product[] {
        return this.repositroy.getProducts();
    }

    getCategories(): string[] {
        return this.repositroy.getCategories();
    }
}
