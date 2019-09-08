import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { tap, map } from 'rxjs/operators';


@Injectable()
export class AuthorsService extends BehaviorSubject<any[]> {
  private data: any[] = [];

  baseUrl:string = 'http://localhost:61272';
  constructor(private http:HttpClient) {
     super([]) 
    }

    public read() {
     
      if (this.data.length) {
          return super.next(this.data);
      }
     
      this.fetch()
          .pipe(
              tap(data => {
                  this.data = data;
                  
              })
          )
          .subscribe(data => {
           
              super.next(data);
          });
  }

  public remove(dataId: any) {
    this.reset();

    this.removeAuthor(dataId)
        .subscribe(() => this.read(), () => this.read());
}


public removeAuthor(dataId:any): Observable<any[]>{
  this.reset();
  console.log("1"+dataId)
  return this.http
  .delete(`${this.baseUrl}/api/author/delete/${dataId}`)
  .pipe(map(res => <any[]>res));
}

private reset() {
  this.data = [];
}

public save(data: any, isNew?: boolean) {
     this.reset();
     if(isNew){
      this.create(data)
      .subscribe(() => this.read(), () => this.read());
    }
    else{
      this.update(data)
      .subscribe(() => this.read(), () => this.read());
    }

}

public create(data:any): Observable<any[]>{

  return this.http
  .post(`${this.baseUrl}/api/author/create`,data)
  .pipe(map(res => <any[]>res));
}

public update(data:any): Observable<any[]>{
 console.log("1"+data)
  return this.http
  .put(`${this.baseUrl}/api/author/update`,data)
  .pipe(map(res => <any[]>res));
}

  public resetItem(dataItem: any) {
    if (!dataItem) { return; }

    const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);
    Object.assign(originalDataItem, dataItem);

    super.next(this.data);
}

  private fetch(): Observable<any[]> {
 
    return this.http
        .get(`${this.baseUrl}/api/author/all-authors`)
        .pipe(map(res => <any[]>res));
}

private serializeModels(data?: any): string {
    return data ? `${JSON.stringify([data])}` : '';
}


}
