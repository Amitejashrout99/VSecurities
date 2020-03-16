import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {alien} from '../shared/alien';
import {base_url} from '../shared/baseurl';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AlienServiceService} from '../services/alien-service.service';
import {FormBuilder,FormGroup} from '@angular/forms';


@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {

  alien:alien;
  alien_property:alien;
  alien_add_form:FormGroup;
  constructor(private http_service:HttpClient,private alien_service:AlienServiceService,
    private fb:FormBuilder,private route:ActivatedRoute, private router:Router) 
  {
      this.createForm();
  }

  ngOnInit() 
  {

  }

  onAddingAlien()
  {
    this.alien_property=this.alien_add_form.value;
    this.alien_service.save(this.alien_property).subscribe((result)=>this.go_to_all_aliens())
  }

  go_to_all_aliens()
  {
    this.router.navigate(['/userdisplay']);
  }

  createForm()
  {
    this.alien_add_form=this.fb.group({
      alien_id:[''],
      alien_name:''
    });
  }

}
