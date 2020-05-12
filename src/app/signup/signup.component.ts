import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


import {user} from '../shared/user';
import {users} from '../shared/users';
import { shopping_cart } from '../shared/shoppingCart';


import {UserloginserviceService} from '../services/userloginservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class SignupComponent implements OnInit {

  name_form_group:FormGroup;
  age_form_group:FormGroup;
  address_form_group:FormGroup;
  gender_form_group:FormGroup;
  nationality_form_group:FormGroup;
  password_form_group:FormGroup;
  availability_checked_status:boolean=false;
  error_message_faced:string;
  isLinear = true;
  
  new_user_object:user;
  new_user_credentials:users;
  cart_items:shopping_cart[]=[];

  genders:string[]=["Male","Female","Transgender"];
  nations:string[]=["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  
  constructor( private fb:FormBuilder,
    private snack_bar:MatSnackBar,
    private user_service_provider:UserloginserviceService,
    private route: ActivatedRoute, 
    private router:Router,
    public dialogRef: MatDialogRef<SignupComponent>) 
  {

  }

  ngOnInit(): void 
  {
    this.name_form_group=this.fb.group({
      user_name:["",[Validators.required,Validators.maxLength(30)]]
    });
    
    this.age_form_group= this.fb.group({
      user_age:[0,[Validators.required]]
    });

    this.address_form_group= this.fb.group({
      user_address:["",[Validators.required]]
    });

    this.gender_form_group=this.fb.group({
      user_gender:['',[Validators.required]]
    });

    this.nationality_form_group=this.fb.group({

      user_nationality:['',[Validators.required]]

    });

    this.password_form_group=this.fb.group({

      user_password:['',[Validators.required]]

    });

  }

  

  checkAvailabilityStatus()
  {
    let username_provided= Object.values(this.name_form_group.value).toString();
    this.user_service_provider.checkUsernameAvailabilityStatus(username_provided).subscribe((status)=>{

      if(status===true)
      {
        this.snack_bar.open("Username is available",'Close', {
          duration: 3000,
          panelClass: ['username_available_snackbar']
        });

        this.availability_checked_status=true;

      }
      if(status===false)
      {
        this.snack_bar.open("Sorry,Username is not available. Please Try another one",'Close', {
          duration: 3000,
          panelClass:['username_unavailable_snackbar']
        });

        this.availability_checked_status=false;
      }


    },(err_msg)=>this.error_message_faced=err_msg);
  }


  signUpUser()
  {
    let username_provided= Object.values(this.name_form_group.value).toString();
    this.user_service_provider.checkUsernameAvailabilityStatus(username_provided).subscribe((status)=>{

      if(status===true)
      {
        this.availability_checked_status=true;
        let user_name=Object.values(this.name_form_group.value).toString();
        let user_age= +(Object.values(this.age_form_group.value).toString());
        let user_address= Object.values(this.address_form_group.value).toString();
        let user_gender=Object.values(this.gender_form_group.value).toString();
        let user_nationality= Object.values(this.nationality_form_group.value).toString();
        let user_password= Object.values(this.password_form_group.value).toString();


        this.new_user_object={
          "id":Math.random()*100,
          "name":user_name,
          "age":user_age,
          "address":user_address,
          "gender":user_gender,
          "nationality":user_nationality,
          "kyc_status":"false"
        }

        this.new_user_credentials={
          "username":user_name,
          "password":user_password
        }
    
        //alert(JSON.stringify(this.new_user_object)+"\n"+JSON.stringify(this.new_user_credentials));
        
        this.user_service_provider.signUpNewUser(this.new_user_object).subscribe();

        this.user_service_provider.addNewUserCredentials(this.new_user_credentials).subscribe((data)=>{

          sessionStorage.setItem("username",data.username);
          sessionStorage.setItem("password",data.password);
          sessionStorage.setItem("cartItems",JSON.stringify(this.cart_items));

          this.user_service_provider.userdata.next(data.username);

          this.router.navigate(['/home']);
          this.dialogRef.close();

          this.snack_bar.open("Welcome to VshareSecurities "+data.username,'Close', {
            duration: 3000
          });

        });
      
      }
      if(status===false)
      {
        this.snack_bar.open("Sorry,Username is not available. Please Try another one",'Close', {
          duration: 3000,
          panelClass:['username_unavailable_snackbar']
        });

        this.availability_checked_status=false;
      }


    },(err_msg)=>this.error_message_faced=err_msg);
    

  }


}
