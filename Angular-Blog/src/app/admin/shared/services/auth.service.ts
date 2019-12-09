import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { IUser, IFirebaseResponse } from '../interfaces';
import { Observable } from 'rxjs';
import {tap,map} from 'rxjs/internal/operators'
@Injectable()
export class AuthService {
    
    get token() : string {
     var expDate= new Date(localStorage.getItem('fb-token-exp'));
     if(new Date()>expDate){
        this.logout();
        return null;
     }
        return localStorage.getItem('fb-token');    
   }
   
    constructor(private httpClinet:HttpClient) {}

    login(user:IUser):Observable<any>{
        user.returnSecureToken=true;
        return this.httpClinet.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
       .pipe(
           tap(this.setToken)
           )
    }

    logout(){
        this.setToken(null);
    }

    IsAuthenticated():boolean {
        return !!this.token;
    }

    
    private  setToken(response:IFirebaseResponse|null) {  
        console.log('response',response)  
        if(response){
            var expDate=new Date(new Date().getTime()+ +response.expiresIn*1000);      
            localStorage.setItem('fb-token',response.idToken);
            localStorage.setItem('fb-token-exp',expDate.toString());
        }
        else{
            localStorage.clear();
        }
        
      
    }
    
}