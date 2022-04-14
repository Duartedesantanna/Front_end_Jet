import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './products/home/home.component';
import { ShoppComponent } from './products/shopp/shopp.component';

const routes: Routes = [

      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'shopp', component: ShoppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
