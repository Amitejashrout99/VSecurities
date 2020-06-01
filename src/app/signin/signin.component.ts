import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {users} from '../shared/users';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import {UserloginserviceService} from '../services/userloginservice.service';
import {AdminServiceService} from '../services/admin-service.service';
import {SignupComponent} from '../signup/signup.component';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {shopping_cart} from '../shared/shoppingCart';
import { admin_credentials } from '../shared/admin_credentials';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  
  user_attempting_to_login:users;
  user_login_form:FormGroup;
  user_data_received:users=null;
  user_name:string;
  public data:any=[];
  cart_items:shopping_cart[]=[];
  user_password:string;
  error_message_faced:string;
  current_users_object:users;
  
  
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
  
  
  
  
  constructor(private user_login_service:UserloginserviceService,
    private admin_service_provider:AdminServiceService,
    private fb:FormBuilder,
    private snack_bar:MatSnackBar,
    private http_service:HttpClient, 
    private route: ActivatedRoute, private router:Router,
    public dialogRef: MatDialogRef<SigninComponent>,
    private sign_up_dialog_box:MatDialog) 
    {
        this.createForm();
    } 

  ngOnInit(): void {
  }


  async onAttemptingToLogIn()
  {
      this.user_attempting_to_login=this.user_login_form.value;
      this.user_name=this.user_attempting_to_login.username;
      this.user_password=this.user_attempting_to_login.password;
     
      //alert(this.user_name);
      
      await this.user_login_service.verifyUser(this.user_attempting_to_login).then((data)=>{

            if(data.status===200)
            {
              sessionStorage.setItem("username",data.body.username);
              sessionStorage.setItem("password",data.body.password);
              sessionStorage.setItem("cartItems",JSON.stringify(this.cart_items));

              this.user_login_service.userdata.next(data.body.username);

              this.router.navigate(['/home']);
              this.dialogRef.close();
            }

      }).catch((err_msg)=>{

        let error_code:number=+(err_msg.split("-")[0]);
            
            if(error_code===404)
            {
              this.snack_bar.open("User Account Could'nt be found,Create a new Account ?",'Yes', {
                duration: 3000,
                panelClass:['username_unavailable_snackbar']
              }).onAction().subscribe(()=>{

                this.sign_up_dialog_box.open(SignupComponent,{width:'600px', height:'550px'});
                this.dialogRef.close();

              });
            }

            if(error_code===400)
            {
              this.snack_bar.open("Wrong Password, Please check your password",'Close', {
                duration: 3000,
                panelClass:['username_unavailable_snackbar']
              });
            }

      });


      this.user_login_form.reset();      

  }


  adminLogIn()
  {
    let user_credentials:users=this.user_login_form.value;
    let admin_credentials:admin_credentials={

      "admin_username":user_credentials.username,
      "admin_password":user_credentials.password

    }
    this.admin_service_provider.verifyAdminStatus(user_credentials.username).subscribe((res)=>{

        if(res.status===200)
        {
          this.admin_service_provider.verifyAdminCredentials(admin_credentials).subscribe((data)=>{
              
              if(data.status===200)
              {
                this.snack_bar.open("Welcome "+data.body.admin_username,'Close', {
                  duration: 3000
                });
                
                sessionStorage.setItem("adminUsername",data.body.admin_username);
                sessionStorage.setItem("cartItems",JSON.stringify(this.cart_items));

                this.admin_service_provider.adminData.next(data.body.admin_username);
                this.admin_service_provider.adminMenuDisplay.next(true);
                
                this.router.navigate(['/admin']);
                this.dialogRef.close();


              }
            
          },(err_msg:string)=>{

            let error_code:number=+(err_msg.split("-")[0]);
            if(error_code===401)
            {
              this.snack_bar.open("Please enter the correct Password",'Close', {
                duration: 3000,
                panelClass:['username_unavailable_snackbar']
              });
            }

          });
        }

    },(err)=>{
      
      this.snack_bar.open("You don't have administrative priveleges",'Close', {
        duration: 3000,
        panelClass:['username_unavailable_snackbar']
      });
    
    });


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
  }

}

