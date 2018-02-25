import { Injectable } from '@angular/core';

    @Injectable()
    export class DateService {
        getStringDate(d: String){
            let date=d.split("T");
            return date[0]+" "+date[1].split('.')[0];
        }
    

    
    }