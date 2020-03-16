import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route_service:ActivatedRoute, private router:Router)
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    

    if(username===null)
    {
      alert("Please login to continue");
      this.router.navigate(['/login']);
    }

    
  }

}
