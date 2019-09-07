import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { IUser } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
   
   
    get token() : string {
       return '';
   }
   
    constructor(private httpClinet:HttpClient) {}

    login(user:IUser):Observable<any>{
        return this.httpClinet.post('',user)
    }

    logout(){

    }

    IsAuthenticated():boolean {
        return !!this.token;
    }

    
    private set setToken(v : string) {
       
    }
    
}