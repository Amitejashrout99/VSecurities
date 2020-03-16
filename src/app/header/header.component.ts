import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
  
  constructor(private route_service:ActivatedRoute, private router:Router) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    

    if(username!=null)
    {
      document.getElementById("banner_message").innerHTML="Hello "+username;
    }
  }

}
