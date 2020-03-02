import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{RouterModule,Routes} from '@angular/router';
import {various_routes} from '../app-routing/routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(various_routes)
  ],

  exports:[RouterModule]
})
export class AppRoutingModule { }
