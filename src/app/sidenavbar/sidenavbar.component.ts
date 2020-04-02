import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  welcome_message:string="Hello Guest";
  //name_of_user:string=null;

  constructor() 
  {

  }

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
