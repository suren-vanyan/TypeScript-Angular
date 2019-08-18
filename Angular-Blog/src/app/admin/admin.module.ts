import { SloginPageComponent } from './slogin-page/slogin-page.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const route:Routes=[
    {
      path:'',component:AdminLayoutComponent,children:[
          {path:'',redirectTo:'/admin/login',pathMatch:'full'},
          {path:'login',component:SloginPageComponent},
          {path:'dashboard',component:DashboardPageComponent},
          {path:'edit',component:EditPageComponent}
      ]
    }
]

@NgModule({
    declarations:[AdminLayoutComponent,SloginPageComponent, DashboardPageComponent, EditPageComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(route)
    ],
    exports:[RouterModule]
   
})

export class AdminModule{

}