import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { Chapter } from "../model/chapter.model";
import { BookRepository } from "../model/book.repository";
import { UploadEvent, UploadFile } from 'ngx-file-drop';


import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 
import {ImageuploadService} from '../imageUpload.service';


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
  
  content: string;
  isLoading=false;
   

    public dropped(event: UploadEvent) {
        this.isLoading = true;
        for (const file of event.files) {
            file.fileEntry.file(info => {
              console.log(info);
              this.imageService.sendFile(info).subscribe(res => {
                this.newChapter.image=res;
                this.isLoading = false;
                     
            });;
        });
        }    
  } 

  constructor(private router: Router, private route: ActivatedRoute, private repository: BookRepository,
    private imageService: ImageuploadService) { }

  

  otherImage(){

    this.downloadURL = null;
 }    



  ngOnInit() {

      this.getBookDetail(this.route.snapshot.params['id']);

  }

  getBookDetail(id) {
    this.repository.getBook(id).subscribe(res=>{
      this.book=res;
  }
  );
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
    this.downloadURL = null;
    
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
      this.downloadURL=null;
      this.newChapter = {};
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

  


