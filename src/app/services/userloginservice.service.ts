import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {users} from '../shared/users';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginserviceService 
{

  login_status: number;
  status_flag:number;
  user_attempt_to_login:users;
  constructor(private http_service: HttpClient) 
  { 

  }

  public verifyUser(user_name:string):Observable<users>
  {
      return this.http_service.get<users>(base_url+"verify_user/"+user_name);
  }

}
