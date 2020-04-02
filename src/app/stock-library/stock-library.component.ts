import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-stock-library',
  templateUrl: './stock-library.component.html',
  styleUrls: ['./stock-library.component.scss']
})
export class StockLibraryComponent implements OnInit {

  
  open_status:boolean=false;
  
  constructor(private route_service: ActivatedRoute,
    private router:Router) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    
    this.router.navigate(['/stockLibrary', {outlets: {'side': ['banner']}}])

    if(username===null)
    {
      alert("Please login to continue");
      this.router.navigate(['/login']);
    }
  }

  checkOpenClose()
  {
    this.open_status=!this.open_status;
  }

}
