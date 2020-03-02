import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {alien} from '../shared/alien';
import {base_url} from '../shared/baseurl';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AlienServiceService} from '../services/alien-service.service';


@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {

  alien:alien;
  
  constructor(private http_service:HttpClient,private alien_service:AlienServiceService) 
  {

  }

  ngOnInit() 
  {

  }

  public onAddingAlien()
  {
    
  }

}
