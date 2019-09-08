import { Author } from './author.model';
import { AuthorsService } from './../services/authors.service';

import { Component,OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State,process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  styleUrls: ['./authors.component.css'],
  template: 
  `
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
  <button kendoGridAddCommand type="button">Add new Author</button>
   </ng-template>
   <kendo-grid-column field="id" editor="numeric" title="ID">
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
        <input [(ngModel)]="dataItem.id" kendoGridFocusable name="id" class="k-textbox" type="number" disabled/>
      </ng-template>
  </kendo-grid-column>
  <kendo-grid-column field="name" title="FirstName">
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.name" kendoGridFocusable name="name" class="k-textbox" required/>
      </ng-template>
  </kendo-grid-column>
  <kendo-grid-column field="surName" title="LastName">
      <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.surName" kendoGridFocusable name="surName" class="k-textbox" required/>
      </ng-template>
      </kendo-grid-column>
  <kendo-grid-command-column title="command" width="220">
  <ng-template kendoGridCellTemplate let-isNew="isNew">
      <button kendoGridEditCommand type="button" [primary]="true">Edit</button>
      <button kendoGridRemoveCommand type="button" [primary]="true">Remove</button>
      <button
kendoGridSaveCommand type="button"
[disabled]="myForm.invalid || myForm.pristine">{{ isNew ? 'Add' : 'Update' }}</button>
      <button kendoGridCancelCommand type="button">{{ isNew ? 'Discard changes' : 'Cancel' }}</button>
  </ng-template>
</kendo-grid-command-column>        
  </kendo-grid>
  </form>
`
})


export class AuthorsComponent implements  OnInit{
  public view: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };

  private authorsService: AuthorsService;
  private editedRowIndex: number;
  private editedAuthor: Author;
 
  constructor(@Inject(AuthorsService) authorServiceFactory: any) {
    this.authorsService = authorServiceFactory();
}

    ngOnInit() {
      this.view = this.authorsService.pipe(map(data => process(data, this.gridState)));

      this.authorsService.read();
        
    }
    public onStateChange(state: State) {
      this.gridState = state;
      this.authorsService.read();
  }

  public addHandler({sender}, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);
    sender.addRow(new Author());
}

public editHandler({sender, rowIndex, dataItem}) {
  this.closeEditor(sender);

  this.editedRowIndex = rowIndex;
  this.editedAuthor = Object.assign({}, dataItem);

  sender.editRow(rowIndex);
}

public cancelHandler({sender, rowIndex}) {
  this.closeEditor(sender, rowIndex);
}

public saveHandler({sender, rowIndex, dataItem, isNew}) {
  this.authorsService.save(dataItem, isNew);
  sender.closeRow(rowIndex);
  this.editedRowIndex = undefined;
  this.editedAuthor = undefined;
}

public removeHandler({dataItem}) {
  this.authorsService.remove(dataItem.id);
}
private closeEditor(grid, rowIndex = this.editedRowIndex) {
  grid.closeRow(rowIndex);
  this.authorsService.resetItem(this.editedAuthor);
  this.editedRowIndex = undefined;
  this.editedAuthor = undefined;
}
    public gridData:any;
}
