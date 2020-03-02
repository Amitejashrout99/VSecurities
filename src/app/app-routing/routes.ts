import {Routes} from '@angular/router';
import {UseraddComponent} from '../useradd/useradd.component';
import {UserdisplayComponent} from '../userdisplay/userdisplay.component';

export const various_routes:Routes=[

    {path:'useradd',component:UseraddComponent},
    {path:'userdisplay',component:UserdisplayComponent}

];