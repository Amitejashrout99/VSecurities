
import {stock} from './stock';
import {user} from './user';
import {user_kyc_data} from './user_kyc_data';
import {stock_reviews} from './stock_reviews';

export class transactions_data_for_admin
{
    stock_name:String;
    stock_basic_data:stock;
    customers_basic_data:user[];
    customer_kyc_data:user_kyc_data[];
    total_investment_made:number;
    total_returns_made:number;
    no_of_times_bought:number;
    no_of_times_sold:number;
    stock_review_data:stock_reviews;
}