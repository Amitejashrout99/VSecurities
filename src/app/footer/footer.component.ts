import { Component, OnInit } from '@angular/core';

import {UserloginserviceService} from '../services/userloginservice.service';
import {AdminServiceService} from '../services/admin-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  username:string=null;
  admin_username:string=null;
  admin_authorization_status:boolean=false;
  
  constructor(private user_service_provider:UserloginserviceService,
    private admin_service_provider:AdminServiceService)
  {

  }

  ngOnInit(): void 
  {
    this.username= sessionStorage.getItem("username");
    this.admin_username= sessionStorage.getItem("adminUsername");

    this.user_service_provider.userdata.subscribe((data)=>this.username=data);

    this.admin_service_provider.adminData.subscribe((data)=>this.admin_username=data);

    this.admin_service_provider.adminMenuDisplay.subscribe((data)=>this.admin_authorization_status=data);

  }

}
