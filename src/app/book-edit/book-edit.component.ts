import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {

    book : Book= {};
    snapshot: Observable<any>;
    task: AngularFireUploadTask;
    filePath: string;
    content: string;
    uploadPercent: Observable<number>;
    public downloadURL: Observable<string>;
    isLoading=false;

    public files: UploadFile[] = null;
 
   

    public dropped(event: UploadEvent) {
    this.isLoading = true;
    this.files = event.files;
    for (const file of event.files) {
      file.fileEntry.file(info => {
        console.log(info);
         this.uploadFiles(info);
        
      });
    }
    setTimeout(()=>{    //<<<---    using ()=> syntax
        // get notified when the download URL is available
        this.downloadURL = this.task.downloadURL();
        
        this.downloadURL.subscribe(res => {
            this.book.image=res;
            this.isLoading = false;
                 
        });

   },800);
    // observe percentage changes
    
  } 

   public fileOver(event){
    console.log(event);
   }
 
    public fileLeave(event){
    console.log(event);
    }

    constructor(private repository: BookRepository, private router: Router, 
        private storage: AngularFireStorage,  private route: ActivatedRoute) {
            
    }

    otherImage(){
        this.files= null;
        this.downloadURL = null;      

    }    

    uploadFiles(file) {
        if(file.type.indexOf('image')===-1){
            this.files=null;
        } else { 
            //this.uploadFiles(info);
            //const file = info;
            this.filePath = `/${new Date().getTime()}_${file.name}`;
            this.task = this.storage.upload(this.filePath, file);
            this.uploadPercent = this.task.percentageChanges();
                      
        }
    } 
    

    ngOnInit() {
        this.getBook(this.route.snapshot.params['id']);
    }

    getBook(id) {
        this.book=this.repository.getBook(id);
        /* this.http.get('/book/'+id).subscribe(data => {
            this.book = data;
        }); */
    }

    updateBook(id) {
        this.repository.saveBook(this.book,id);
        this.router.navigate(['/book-details',id ]);
        
        /* this.http.put('/book/'+id, data)
            .subscribe(res => {
                    let id = res['_id'];
                    this.router.navigate(['/book-details', id]);
                }, (err) => {
                    console.log(err);
                }
            ); */
    }

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
