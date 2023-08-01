import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatComponent } from '@page/+cat/components';

const routes: Routes = [
  {
    path: '',
    component: CatComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
