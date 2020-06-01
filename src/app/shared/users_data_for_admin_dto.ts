
import {user_kyc_data} from './user_kyc_data';
import {forum_overview_dto} from './forum_overview_dto';
import {user} from './user';

export class users_data_for_admin_dto
{
    user_name:string;
    user_obj:user;
    user_kyc_data_obj:user_kyc_data;
    forum_overview_dto_obj:forum_overview_dto;
}

