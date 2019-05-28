import { NgModule } from '@angular/core';
import { ProductRepository } from '../product.repository';
import { StaticSource } from '../model/product.repository';

@NgModule({
    providers: [ProductRepository, StaticSource]
})

export class ModelModule { }