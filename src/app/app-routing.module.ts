import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarmentAddPageComponent } from './feature/garments-management/garment-add-page/garment-add-page.component';
import { SuccessComponent } from './feature/garments-management/success/success.component';
import { GarmentListPageComponent } from './feature/garments-management/garment-list-page/garment-list-page.component';

const routes: Routes = [
  {
    path: 'garment-management/add-page',
    component : GarmentAddPageComponent
  },
  {
    path: 'garment-management/success-page',
    component: SuccessComponent
  },
  {
    path: 'garment-management/dashboard-page',
    component: GarmentListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
