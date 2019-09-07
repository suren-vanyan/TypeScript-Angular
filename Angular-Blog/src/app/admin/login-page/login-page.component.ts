import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';

import { AuthService } from './../shared/services/auth.service';
import { IUser } from './../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


 formgroup:FormGroup;

  constructor(private auth: AuthService,
              private router:Router) {
    
    
  }

  onSubmit(){
    
    if(this.formgroup.invalid)
    return;

   const user: IUser = {
      email:this.formgroup.value.email,
      password: this.formgroup.value.password
    }

    this.auth.login(user).subscribe(a=>{
      this.formgroup.reset(),
      this.router.navigate(['/admin','dashboard'])
    })
  }
  
  ngOnInit() {
   
    this.formgroup=new FormGroup({
      email:new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password:new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ])
    })
  
  }

}
