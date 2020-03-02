import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserdisplayComponent } from './userdisplay/userdisplay.component';
import { UseraddComponent } from './useradd/useradd.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';



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
    HttpClientModule
    
  ],
  providers: [AlienServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
