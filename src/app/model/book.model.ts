import {Chapter} from '../model/chapter.model';
import {Comment} from '../model/comment.model';
export class Book {
    constructor(

        public title?: string,
        public author?: String,
        public category?: string,
        public description?: string,
        public updated_date?: String,
        public image?: string,
        public chapters?: Array<Chapter>,
        public comments?: Array<Comment>,
        public rating?: number
       ) { }
}