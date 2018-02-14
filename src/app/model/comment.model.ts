export class Comment {
    constructor(
        public id?: number,
        public author?: String,
        public text?: string,
        public date?:String,
        public image?: string, 
        public likes?: number,
        public userslikes? : Array<String>
       ) { }
}
