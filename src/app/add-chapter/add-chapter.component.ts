import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { Chapter } from "../model/chapter.model";
import { BookRepository } from "../model/book.repository";
import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 


@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit {

  book:any={};
  isEditing = false;
  isCreating = false;
  newChapter: Chapter={};
  public downloadURL: Observable<string>;
  snapshot: Observable<any>;
  task: AngularFireUploadTask;
  filePath: string;
  content: string;

  public files: UploadFile[] = null;

  constructor(private router: Router, private route: ActivatedRoute, private repository: BookRepository,
    private storage: AngularFireStorage) { }

  public dropped(event: UploadEvent) {
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
            this.newChapter.image=res;
                 
        });

   },800);
   this.downloadURL = null;
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
                    
      }
  } 

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
      this.book=this.repository.getBook(id);
  }
    
  get chapters():Chapter[] {
    return this.book.chapters;
  }

  addChapter(){
    this.newChapter.number=this.chapters.length+1;
    this.book.chapters.push(this.newChapter);
    this.repository.saveBook(this.book, this.book._id);
    this.isCreating= false;
    this.newChapter = {};
    this.files = null;
    
  }

  startEditChapter(num: number){
    this.isEditing = true;
    this.isCreating = false;
    this.newChapter=this.book.chapters[num-1];
  }

  startCreateChapter(){
    this.isEditing = false;
    this.isCreating = true;
  }

  editChapter (){
    this.book.chapters.splice(this.book.chapters.
      findIndex(p => p.number == this.newChapter.number), 1, this.newChapter);
      this.repository.saveBook(this.book, this.book._id);
      this.isEditing=false;
      this.files=null;
      this.newChapter = {};
  }

  public fileOver(event){
    console.log(event);
   }
 
  public fileLeave(event){
    console.log(event);
  }

  deleteChapter(num: number){
    if(this.newChapter.number==num){
      this.newChapter={};
      this.isEditing = false;
    }
    this.book.chapters.splice(this.book.chapters.
      findIndex(p => p.number == num), 1);
    this.repository.saveBook(this.book, this.book._id);

  }

  cancel(){
    this.isCreating=false;
    this.newChapter = {};
  }

  }

  


