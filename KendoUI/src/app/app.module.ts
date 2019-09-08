
//services
import { AuthorsService } from './services/authors.service';
import { BooksService } from './services/books.service';

//components
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';

//routing
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientJsonpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers:
   [
    BooksService,
    AuthorsService,
    {
      deps: [HttpClient],
      provide: BooksService,
      useFactory: (jsonp: HttpClient) => () => new BooksService(jsonp)
    },
    {
      deps: [HttpClient],
      provide: AuthorsService,
      useFactory: (jsonp: HttpClient) => () => new AuthorsService(jsonp)
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
