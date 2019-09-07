import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


 formgroup:FormGroup;

  constructor() {
    
    
  }

  onSubmit(){
    console.log( this.formgroup)
    if(this.formgroup.invalid)
    return;
   
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
