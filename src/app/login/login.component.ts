import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {users} from '../shared/users';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {UserloginserviceService} from '../services/userloginservice.service';
import {SigninComponent} from '../signin/signin.component';
import {SignupComponent} from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{

  user_attempting_to_login:users;
  user_login_form:FormGroup;
  user_data_received:users=null;
  user_name:string;
  public data:any=[];
  user_password:string;


  formErrors={          //error java type object

    'username':'',
    'password':''
  };


  validationMessages={

    'username':{
      'required':'Username is required',
      'minlength':'Must be at least 2 characters long',
      'maxlength':"Cannot be more than 25 characters long"
    },

    'password':{
      'required':'Password is required'
    }
  }

  constructor(private user_login_service:UserloginserviceService,private fb:FormBuilder,
    private http_service:HttpClient, private route: ActivatedRoute, private router:Router,
    public signin_dialog_box:MatDialog,
    public signup_dialog_box:MatDialog) 
  {

  }



  ngOnInit(): void {
  }

  /*onAttemptingToLogIn()
  {
      this.user_attempting_to_login=this.user_login_form.value;
      this.user_name=this.user_attempting_to_login.username;
      this.user_password=this.user_attempting_to_login.password;
     
      this.user_login_service.verifyUser(this.user_name).subscribe((data)=> 
      this.user_data_received=data);
      

      if((this.user_data_received["username"]===this.user_name) && (this.user_data_received["password"]===this.user_password))
      {
        this.onSuccessfullLogIn(this.user_name,this.user_password);
      }
      else{
        this.onUnsuccessfullLogIn();
      }

      this.user_login_form.reset();      

  }

  onSuccessfullLogIn(username:string,password:string)
  {
    sessionStorage.setItem("username",username);
    sessionStorage.setItem("password",password);
    this.router.navigate(['/home']);
  }

  onUnsuccessfullLogIn()
  {
      document.getElementById("welcome_banner").innerHTML="Please Enter Correct Credentials";
  }

  openNewUserForm()
  {

  }

  createForm()
  {
    this.user_login_form= this.fb.group({

        username:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        password:['',[Validators.required]]

    });

    this.user_login_form.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data ?:any)
  {
    if(!this.user_login_form)
    {
      return;
    }
    const form_value= this.user_login_form;
    for(const field in this.formErrors)
    {
        if(this.formErrors.hasOwnProperty(field))
        {
           this.formErrors[field]='';
           const control= this.user_login_form.get(field);
           if(control && control.dirty && !control.valid)
           {
             const messages= this.validationMessages[field];
             for(const key in control.errors)
             {
               if(control.errors.hasOwnProperty(key))
               {
                 this.formErrors[field]+= messages[key]+' ';
               }
             }
           }
        }
    }
  }*/

  openLogInForm():void
  {
      this.signin_dialog_box.open(SigninComponent,{width:'600px', height:'550px'});
  }

  openSignUpForm()
  {
    this.signup_dialog_box.open(SignupComponent,{width:'600px', height:'550px'});
    
  }


}
