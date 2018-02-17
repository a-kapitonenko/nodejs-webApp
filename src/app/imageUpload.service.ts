    import { Injectable } from '@angular/core';
    import { Router, NavigationEnd } from '@angular/router';
    import { Observable } from 'rxjs/Observable';

    import { UploadEvent, UploadFile } from 'ngx-file-drop';

    import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
    import { tap } from 'rxjs/operators';
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';

    @Injectable()
    export class ImageuploadService {
        snapshot: Observable<any>;
        task: AngularFireUploadTask;
        filePath: string;
        content: string;
        uploadPercent: Observable<number>;
        public downloadURL: Observable<string>;
        public file: File = null;
 
 
    public sendFile(file: any):Observable<string> {

    //this.file = file;

    console.log(file);
    this.filePath = `/${new Date().getTime()}_${file.name}`;
    this.task = this.storage.upload(this.filePath, file); 
    return this.task.downloadURL().map(res=>{
        return res;
    });      
  } 

   public fileOver(event){
    console.log(event);
   }
 
    public fileLeave(event){
    console.log(event);
    }

    constructor(private storage: AngularFireStorage) {
            
    }
 

    /* uploadFiles(file):Observable<string> {     
        this.filePath = `/${new Date().getTime()}_${file.name}`;
        this.task = this.storage.upload(this.filePath, file);
        return this.task.downloadURL();                     
    }  */

    }