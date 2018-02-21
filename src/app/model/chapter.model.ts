export class Chapter {
    constructor(
        public number?: number,
        public name?: string,
        public text?: string,
        public image?: string,
        public rating?: Array<number>
       ) { }
}