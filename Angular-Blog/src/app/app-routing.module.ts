import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';


const routes: Routes = [
  {
    path:'',component:MainLayoutComponent,children:[
      {path:'',redirectTo:'/home',pathMatch:'full'},
      {path:'home',component:HomePageComponent},
      {path:'post/:id',component:PostPageComponent}
    ]
  },
  {
    path:'admin',loadChildren:'./admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
