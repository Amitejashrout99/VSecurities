import {Routes} from '@angular/router';
import {UseraddComponent} from '../useradd/useradd.component';
import {UserdisplayComponent} from '../userdisplay/userdisplay.component';
import {LoginComponent} from '../login/login.component';
import { HomeComponent} from '../home/home.component';

export const various_routes:Routes=[

    {path:'useradd',component:UseraddComponent},
    {path:'userdisplay',component:UserdisplayComponent},
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'home',component: HomeComponent}

];