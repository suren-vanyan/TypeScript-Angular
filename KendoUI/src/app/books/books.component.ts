import {BooksService} from '../services/books.service';
import { Book } from '../books/book.model';

import { Component,OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State,process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  styleUrls: ['./books.component.css'],
  template: `
    <form novalidate #myForm="ngForm">
    <kendo-grid
              [data]="view | async"
              [height]="533"
              [pageSize]="gridState.take" [skip]="gridState.skip" [sort]="gridState.sort"
              [pageable]="true" [sortable]="true"
              (dataStateChange)="onStateChange($event)"
              (edit)="editHandler($event)" (cancel)="cancelHandler($event)"
              (save)="saveHandler($event)" (remove)="removeHandler($event)"
              (add)="addHandler($event, myForm)"
              [navigable]="true"
            >
  <ng-template kendoGridToolbarTemplate>
  <button kendoGridAddCommand type="button">Add new Book</button>
   </ng-template>
   <kendo-grid-column field="id" editor="numeric" title="ID" >
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
        <input [(ngModel)]="dataItem.id" kendoGridFocusable name="id" class="k-textbox" type="number" disabled />
      </ng-template>
  </kendo-grid-column>
  <kendo-grid-column field="name" title="Book Name" >
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.name" kendoGridFocusable name="name" class="k-textbox" required/>
      </ng-template>
  </kendo-grid-column>
  <kendo-grid-column field="publishDate"  title="PublishDate"  >
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.publishDate" kendoGridFocusable name="publishDate" class="k-textbox" required/>
      </ng-template>
  </kendo-grid-column>
  <kendo-grid-column field="description"  title="Description">
    <ng-template kendoGridEditTemplate let-dataItem="dataItem">
      <input [(ngModel)]="dataItem.description" kendoGridFocusable name="description" class="k-textbox" required />
    </ng-template>
  </kendo-grid-column>
  <kendo-grid-command-column title="command" width="220">
  <ng-template kendoGridCellTemplate let-isNew="isNew">
      <button kendoGridEditCommand type="button" [primary]="true">Edit</button>
      <button kendoGridRemoveCommand type="button" [primary]="true">Remove</button>
      <button
kendoGridSaveCommand type="button"
[disabled]="myForm.invalid || myForm.pristine">{{ isNew ? 'Add' : 'Update' }} </button>
      <button kendoGridCancelCommand type="button">{{ isNew ? 'Discard changes' : 'Cancel' }}</button>
  </ng-template>
</kendo-grid-command-column>        
  </kendo-grid>
  </form>
`
})
export class BooksComponent implements  OnInit{
  public view: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };

  private booksService: BooksService;
  private editedRowIndex: number;
  private editedProduct: Book;
 
  constructor(@Inject(BooksService) bookServiceFactory: any) {
    this.booksService = bookServiceFactory();
}

    ngOnInit() {
      this.view = this.booksService.pipe(map(data => process(data, this.gridState)));

      this.booksService.read();
        
    }
    public onStateChange(state: State) {
      this.gridState = state;
      this.booksService.read();
  }

  public addHandler({sender}, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);
    sender.addRow(new Book());
}

public editHandler({sender, rowIndex, dataItem}) {
  this.closeEditor(sender);

  this.editedRowIndex = rowIndex;
  this.editedProduct = Object.assign({}, dataItem);

  sender.editRow(rowIndex);
}

public cancelHandler({sender, rowIndex}) {
  this.closeEditor(sender, rowIndex);
}

public saveHandler({sender, rowIndex, dataItem, isNew}) {
  this.booksService.save(dataItem, isNew);
  sender.closeRow(rowIndex);
  this.editedRowIndex = undefined;
  this.editedProduct = undefined;
}

public removeHandler({dataItem}) {

  this.booksService.remove(dataItem.id);
}
private closeEditor(grid, rowIndex = this.editedRowIndex) {
  grid.closeRow(rowIndex);
  this.booksService.resetItem(this.editedProduct);
  this.editedRowIndex = undefined;
  this.editedProduct = undefined;
}
    public gridData:any;
}
