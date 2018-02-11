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
   color = 'primary';
   mode = 'determinate';
   value=40;

  constructor(private repository: BookRepository, private router: Router, private route: ActivatedRoute,
    private fullScreenService: FullscreenService) {
     
   }

  ngOnDestroy() {
  this.subscriptions
    .forEach(s => s.unsubscribe());
  }

  ngOnInit() {
      this.getBook(this.route.snapshot.params['id']);
      this.getChapter(this.route.snapshot.params['num']);
      const subscription = this.fullScreenService.fullscreen$
      .subscribe((fullscreen$) => {
        this.fullscreen$ = fullscreen$;
       });
      this.subscriptions.push(subscription);
      console.log(this.fullscreen$);
   }

   changeFullScreen(){
     this.fullScreenService.setFullScreen(!this.fullscreen$);
   }

  checkChapter(index: number){

    if(index==0){
      this.isFirst = true;
      console.log("isFirst"+this.isFirst);
    } else {
      this.isFirst = false;
    }
    if(index==(this.chapters.length-1)){
      this.isLast = true;
      console.log("isLast"+this.isLast);
    } else {
      this.isLast = false;
    }
      }

  getBook(id) {
      this.book=this.repository.getBook(id);
      
  }

  getChapter(num: number){
    this.index = this.chapters.findIndex(p => p.number == num);   
    this.curChapter = this.book.chapters[this.index];
    this.chapterNum=this.index+1;
    this.checkChapter(this.index);
    //this.getValue();
  }

  getValue(){
      this.value=(this.chapterNum/this.chapters.length)*100;
      console.log(this.value+ ' '+ this.chapterNum+'  '+this.chapters.length );
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



