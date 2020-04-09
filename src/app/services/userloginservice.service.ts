import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {users} from '../shared/users';
import {user} from '../shared/user';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginserviceService 
{

  login_status: number;
  status_flag:number;
  user_attempt_to_login:users;
  constructor(private http_service: HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  { 

  }

  public verifyUser(user_name:string):Observable<users>
  {
      return this.http_service.get<users>(base_url+"verify_user/"+user_name)
      .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  public getUserId(user_name:string):Observable<user>
  {
    
    return this.http_service.get<user>(base_url+"getUserId/"+user_name)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  async getUserIdPromise(user_name:string):Promise<user>
  {
    
    return this.http_service.get<user>(base_url+"getUserId/"+user_name)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  public getAllUsers():Observable<user[]>
  {
    return this.http_service.get<user[]>(base_url+"getAllUsers")
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllUserIds():Observable<number[]|any>
  {
    return this.getAllUsers().pipe(map(users=>users.map(user=>user.id))).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getUserById(user_id:number):Observable<user>
  {
    return this.http_service.get<user>(base_url+"getUserById/"+user_id);
  }

}
