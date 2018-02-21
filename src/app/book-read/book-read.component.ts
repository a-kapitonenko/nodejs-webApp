import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { Chapter } from "../model/chapter.model";
import { FullscreenService } from '../fullscreen.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit {

   book : Book= {};
   chapterNum : number;
   curChapter: Chapter = {};
   isFirst: boolean = false;
   isLast: boolean = false;
   index: number;
   private subscriptions: Subscription[] = [];
   fullscreen$;
   value: number=0;

  constructor(private repository: BookRepository, private router: Router, private route: ActivatedRoute,
    private fullScreenService: FullscreenService) {
     
   }

  ngOnDestroy() {
  this.subscriptions
    .forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.book.chapters=[];
    console.log("inOninitRead");
      this.getBook(this.route.snapshot.params['id']);
      setTimeout(()=>{
        this.getChapter(this.route.snapshot.params['num']);
      },800);
      
      const subscription = this.fullScreenService.fullscreen$
      .subscribe((fullscreen$) => {
        this.fullscreen$ = fullscreen$;
       });
      this.subscriptions.push(subscription);
   }

   changeFullScreen(){
     this.fullScreenService.setFullScreen(!this.fullscreen$);
   }

  checkChapter(index: number){

    if(index==0){
      this.isFirst = true;
    } else {
      this.isFirst = false;
    }
    if(index==(this.chapters.length-1)){
      this.isLast = true;
    } else {
      this.isLast = false;
    }
      }

  getBook(id) {
    this.repository.getBook(id).subscribe(res=>{
      this.book=res;
  }
  );
      
  }

  getChapter(num: number){
    this.index = this.chapters.findIndex(p => p.number == num);   
    this.curChapter = this.book.chapters[this.index];
    this.chapterNum=this.index+1;
    this.checkChapter(this.index);
    this.getValue();
  }

  getValue(){
      this.value=Math.round((this.chapterNum/this.chapters.length)*100);
  }

  get chapters():Chapter[] {
    return this.book.chapters;
  }

  nextChapter(){
    this.curChapter=this.chapters[this.index+1];
    this.chapterNum++;
    this.checkChapter(++this.index);
    this.getValue();
  }

  prevChapter(){
    this.curChapter=this.chapters[this.index-1];
    this.chapterNum--;
    this.checkChapter(--this.index);
    this.getValue();
  }

  }



