import {stock_reviews} from '../shared/stock_reviews';

export class stock_research_dto
{
    total_investment_made:number;
    total_returns_of_stock:number;
    all_customers_ids:number[];
    profit_margin:number;
    no_of_times_bought:number;
    no_of_times_sold:number;
    all_reviews_available:stock_reviews[];
}