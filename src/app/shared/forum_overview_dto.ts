import {forum_main_db} from '../shared/forum_main_db';
import {forum_answer_db} from '../shared/forum_answer_db';

export class forum_overview_dto
{
    no_of_questions_posted:number;
    no_of_questions_answered:number;
    all_questions_posted:forum_main_db[];
    all_answers_posted:forum_answer_db[];
}