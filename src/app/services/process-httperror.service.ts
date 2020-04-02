import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPerrorService {

  constructor() { }

  public handle_error_faced(error_faced: HttpErrorResponse | any)
  {
      let error_msg: string;
      if(error_faced.error instanceof ErrorEvent)
      {
        error_msg= error_faced.error.message;
      }
      else
      {
        error_msg=`${error_faced.status} - ${error_faced.statusText || ''} ${error_faced.error}`;
      }

      return throwError(error_msg);
  }



}
