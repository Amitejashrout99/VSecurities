import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './services/userloginservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  title = 'VshareSecurities';

  constructor(private user_service_provider:UserloginserviceService)
  {

  }
  
  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.user_service_provider.userdata.next(username);

  }

}
