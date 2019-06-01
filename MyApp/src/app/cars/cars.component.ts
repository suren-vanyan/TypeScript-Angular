import { Component } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  addcarStatus = '';
  inputElement = '';
  inputElement2 = '';
  constructor() {
  }
  AddCar() {
    this.addcarStatus = 'Car Added';
  }

  OnKeyUp(event: Event) {
    this.inputElement = (event.target as HTMLInputElement).value;
  }

  OnKeyUp2(value) {
    this.inputElement2 = value;
  }
}
