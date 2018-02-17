import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { CommentsService } from '../comments.service';
import { Comment } from "../model/comment.model";
import { UserRepository } from '../model/user.repository';
//import { setTimeout } from 'timers';

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

    constructor(private router: Router, private route: ActivatedRoute, private repository: BookRepository,
        private chat: CommentsService, private userRepository: UserRepository) {
            
     }
     
    ngOnInit() {
        console.log("in oninit");
        this.book.chapters=[];
        this.book.comments=[];
        
            this.getBookDetail(this.route.snapshot.params['id']);
               
        console.log("id:"+this.route.snapshot.params['id']);
        console.log(this.book.chapters);
        
        this.chat.messages.subscribe(msg => {
            console.log(msg);
            msg = JSON.parse(msg.message);
            if(msg.id==this.book._id &&  this.userRepository.selectedUser.username!=msg.comment.author ){
                this.book.comments.push(msg.comment);
            }
          });
       
    }

    getBookDetail(id) {
       this.repository.getBook(id).subscribe(res=>{
            this.book=res;
        }
        );
        console.log("book:"+this.book);
        /* this.http.get('/book/'+id).subscribe(data => {
            this.book=data;
        }); */ 
    }

    sendMessage() {
        this.chat.sendMsg({
            id: this.book._id,
            comment: this.comment
        });
      }

    getStringDate(d: Date){
        return d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+" "+
        d.getHours()+":"+d.getMinutes();      
    }

    sendComment(){
        this.comment.id=this.book.comments.length;
        this.comment.author = this.userRepository.selectedUser.username;
        this.comment.image =  this.userRepository.selectedUser.image;   
        console.log(this.comment.image);
        this.comment.date= this.getStringDate(new Date());
        this.comment.userslikes= [];
        this.comment.likes=0;
        this.sendMessage();
        this.book.comments.push(this.comment);
        this.repository.saveBook(this.book, this.book._id);
        this.isTyping = false;
        this.comment = {};
    
    }
    
    like(curComment: Comment){
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
        this.repository.saveBook(this.book, this.book._id);
    }

    deleteBook(id) {

        this.repository.deleteBook(id);
        this.router.navigate(['/books']);
    }

}
