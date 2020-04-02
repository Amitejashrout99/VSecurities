import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-library-navbar',
  templateUrl: './stock-library-navbar.component.html',
  styleUrls: ['./stock-library-navbar.component.scss']
})
export class StockLibraryNavbarComponent implements OnInit {

  
  welcome_message:string="Hello Guest";
  constructor() { }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");

    if(username!=null)
    {
      this.welcome_message="Hello "+username;
    }
  }

  togglesidenav()
  {
    alert("Button working");
  }

}
