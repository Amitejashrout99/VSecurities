import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './services/userloginservice.service';
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
    private shopping_cart_service_provider:ShoppingCartServiceService)
  {

  }
  
  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.user_service_provider.userdata.next(username);

    let cart_items=JSON.parse(sessionStorage.getItem("cartItems"));

    this.shopping_cart_service_provider.shopping_cart_items.next(cart_items);

  }

}
