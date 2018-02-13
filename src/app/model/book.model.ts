import {Chapter} from '../model/chapter.model';
export class Book {
    constructor(

        public title?: string,
        public author?: String,
        public category?: string,
        public description?: string,
        public updated_date?: Date,
        public image?: string,
        public chapters?: Array<Chapter>
       ) { }
}