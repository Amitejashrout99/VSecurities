import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './services/userloginservice.service';
import {AdminServiceService} from './services/admin-service.service';
import {ShoppingCartServiceService} from './services/shopping-cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  title = 'VshareSecurities';

  constructor(private user_service_provider:UserloginserviceService,
    private shopping_cart_service_provider:ShoppingCartServiceService,
    private admin_service_provider:AdminServiceService)
  {

  }
  
  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.user_service_provider.userdata.next(username);

    let admin_username= sessionStorage.getItem("adminUsername");

    this.admin_service_provider.adminData.next(admin_username);

    if(admin_username!=null)
    {
      this.admin_service_provider.adminMenuDisplay.next(true);
    }
    if(username!=null)
    {
      this.admin_service_provider.adminMenuDisplay.next(false);
    }

    let cart_items=JSON.parse(sessionStorage.getItem("cartItems"));

    this.shopping_cart_service_provider.shopping_cart_items.next(cart_items);

  }

}
