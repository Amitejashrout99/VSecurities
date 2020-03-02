import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserdisplayComponent } from './userdisplay/userdisplay.component';
import { UseraddComponent } from './useradd/useradd.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';



import {AlienServiceService} from './services/alien-service.service';

@NgModule({
  declarations: [
    AppComponent,
    UserdisplayComponent,
    UseraddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
    
  ],
  providers: [AlienServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
