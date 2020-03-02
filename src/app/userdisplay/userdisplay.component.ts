import { Component, OnInit } from '@angular/core';
import {alien} from '../shared/alien';
import {AlienServiceService} from '../services/alien-service.service';


@Component({
  selector: 'app-userdisplay',
  templateUrl: './userdisplay.component.html',
  styleUrls: ['./userdisplay.component.scss']
})
export class UserdisplayComponent implements OnInit {

  
  all_aliens:alien[];
  
  constructor(private alien_service: AlienServiceService) 
  {

  }

  ngOnInit() 
  {
      this.alien_service.getAllAliensPresent().subscribe((data)=>{
        this.all_aliens=data;
      });
  }



}
