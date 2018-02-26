import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { CommentsService } from '../comments.service';
import { Comment } from "../model/comment.model";
import { UserRepository } from '../model/user.repository';
import { DialogService } from '../dialog.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {

    book:any = {};
    isTyping = false;
    comment: Comment={};
    bookTags: any[]=[];
    authorName: any=null;

    constructor(private router: Router, private route: ActivatedRoute, private repository: BookRepository,
        private chat: CommentsService, private userRepository: UserRepository, private dialog: DialogService,
    public translate:TranslateService ) {
            
     }

     getBookTags(id: number){
        this.repository.getBookTags(id).subscribe(res=>{
            this.bookTags=res;
        }
        );

     }
     
    ngOnInit() {
        this.book.chapters=[];
        this.book.comments=[];
        this.getBookDetail(this.route.snapshot.params['id']);
        this.getBookTags(this.route.snapshot.params['id']);
        this.chat.messages.subscribe(msg => {
            msg = JSON.parse(msg.message);
            if(msg.id==this.book._id &&  this.userRepository.selectedUser.username!=msg.comment.author ){
                this.book.comments.push(msg.comment);
            }
          });
       
    }

    getBookDetail(id) {
       this.repository.getBook(id).subscribe(res=>{
            this.book=res;
            this.userRepository.getUserName(this.book.author).subscribe(res=>{
                this.authorName = res.username;
            });
        });
    }

    sendMessage() {
        this.chat.sendMsg({
            id: this.book._id,
            comment: this.comment
        });
      }

    getStringDate(d: Date){
        return this.checkDate(d.getDate())+"."+this.checkDate(d.getMonth())+"."+
        this.checkDate(d.getFullYear())+" "+
        this.checkDate(d.getHours())+":"+this.checkDate(d.getMinutes());      
    }

    checkDate(num: number): string{
        if(num<10){
            return "0"+num;
        } else {
            return num.toString();
        }
    }
    isAuth() {
        if(this.userRepository.isAuth()) {
            this.isTyping = true;
        } else {
            this.translate.get("BLOCKCOM").subscribe(res=>{
                this.dialog.openNotificationDialog(res, 0);
            });
            
        }
    }
    sendComment(){
        this.comment.id=this.book.comments.length;
        this.comment.author = this.userRepository.selectedUser.username;
        this.comment.image =  this.userRepository.selectedUser.image;   
        this.comment.date= this.getStringDate(new Date());
        this.comment.userslikes= [];
        this.comment.likes=0;
        this.sendMessage();
        this.book.comments.push(this.comment);
        this.repository.saveBook(this.book, this.book._id,null);
        this.isTyping = false;
        this.comment = {};
    }
    
    like(curComment: Comment){
        if(this.userRepository.isAuth()) {
            let likedComment = curComment;
            if(curComment.userslikes.findIndex(p => p ==  this.userRepository.selectedUser.username)==-1){
                likedComment.likes++;
                likedComment.userslikes.push(this.userRepository.selectedUser.username);
            } else {
                likedComment.likes--;
                likedComment.userslikes.splice(likedComment.userslikes.
                    findIndex(p => p == this.userRepository.selectedUser.username), 1);
            }
            this.book.comments.splice(this.book.comments.
                findIndex(p => p.id == curComment.id), 1, likedComment);
            this.repository.saveBook(this.book, this.book._id, null);
        } else {
            this.translate.get("BLOCKLIKE").subscribe(res=>{
                this.dialog.openNotificationDialog(res, 0);
            });
            
        }
    }

    deleteBook(id) {
        this.repository.deleteBook(id);
        this.router.navigate(['/books']);
    }

}
