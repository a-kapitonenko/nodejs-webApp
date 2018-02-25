import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { Chapter } from "../model/chapter.model";
import { Rating } from "../model/rating.model";
import { FullscreenService } from '../fullscreen.service';
import { Subscription } from 'rxjs/Subscription';
import { UserRepository } from '../model/user.repository';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit {

   book : any= {};
   chapterNum : number;
   curChapter: Chapter = {};
   isFirst: boolean = false;
   isLast: boolean = false;
   index: number;
   private subscriptions: Subscription[] = [];
   fullscreen$;
   value: number=0;
   rating: Rating;

  constructor(private repository: BookRepository, private router: Router, private route: ActivatedRoute,
    private fullScreenService: FullscreenService, private userRepository: UserRepository) {
     
   }

   onRateChange($event){
    
    if(this.rating.rate!=undefined && this.userRepository.selectedUser!=null ){
      console.log(this.rating.rate);
      this.rating.user = this.userRepository.selectedUser._id;
      if(this.book.chapters[this.chapterNum-1].rating.find(p=>p.user==this.rating.user)!=undefined){
        this.book.chapters[this.chapterNum-1].rating.splice( 
          this.book.chapters[this.chapterNum-1].rating.findIndex(p=>p.user==this.rating.user),1,this.rating);
      } else {
        this.book.chapters[this.chapterNum-1].rating.push(this.rating);
      } 
      this.book.chapters[this.chapterNum-1].averageRating=this.getAverageRating();
      this.setBookRating();
      this.repository.saveBook(this.book, this.book._id, null);

    }
    
   }

   getAverageRating(): number {
    let average: number=0;
    for (let rating of  this.book.chapters[this.chapterNum-1].rating){
      average+=rating.rate;
    }
    return Math.round(average/this.book.chapters[this.chapterNum-1].rating.length);
  }

  setBookRating(){
    let rating=0;
    for(let chapter of this.book.chapters){
      rating+=chapter.averageRating;
    }
    this.book.rating=Math.round(rating/this.book.chapters.length);
  }

  ngOnDestroy() {
  this.subscriptions
    .forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.rating={};
      this.book.chapters=[];
      this.getBook(this.route.snapshot.params['id']);  
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
      this.getChapter(this.route.snapshot.params['num']);    
  }
  );      
  }

  
  getChapter(num: number){

    this.index = this.chapters.findIndex(p => p.number == num);   
    console.log("index:"+ this.index);
    this.curChapter = this.book.chapters[this.index];
    console.log(this.curChapter);
    this.getRating(this.curChapter);
    this.chapterNum=this.index+1;
    this.checkChapter(this.index);
    this.getValue();
  }

  getRating(curChapter: Chapter){
    console.log(curChapter);
    if(this.userRepository.selectedUser!=null){
      this.rating = curChapter.rating.find(p=>p.user==this.userRepository.selectedUser._id);
    } else {
      this.rating = undefined;
    }
    if(this.rating==undefined){
      this.rating={};
      this.rating.rate=curChapter.averageRating;
    }
    
  }

  getValue(){
      this.value=Math.round((this.chapterNum/this.chapters.length)*100);
  }

  get chapters():Chapter[] {
    return this.book.chapters;
  }

  nextChapter(){
    this.curChapter=this.chapters[this.index+1];
    this.getRating(this.curChapter);
    this.chapterNum++;
    this.checkChapter(++this.index);
    this.getValue();
  }

  prevChapter(){
    this.curChapter=this.chapters[this.index-1];
    this.getRating(this.curChapter);
    this.chapterNum--;
    this.checkChapter(--this.index);
    this.getValue();
  }

  }



