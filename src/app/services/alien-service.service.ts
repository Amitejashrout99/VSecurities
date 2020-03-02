import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {alien} from '../shared/alien';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlienServiceService 
{

  constructor(private http_service:HttpClient) 
  { 

  }

  public getAllAliensPresent():Observable<alien[]>
  {
     return this.http_service.get<alien[]>(base_url+'Aliens');
  }

  public save(alien: alien) {
    return this.http_service.post<alien>(base_url+'Aliens', alien);
  }

}
