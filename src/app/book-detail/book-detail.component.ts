import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {

    book:any = {};

    constructor(private router: Router, private route: ActivatedRoute, private repository: BookRepository, private http: HttpClient) {
        
     }
    ngOnInit() {
        this.getBookDetail(this.route.snapshot.params['id']);
        //this.book._id=this.route.snapshot.params['id'];
    }

    getBookDetail(id) {
        this.book=this.repository.getBook(id);
        /* this.http.get('/book/'+id).subscribe(data => {
            this.book=data;
        }); */ 
    }

    deleteBook(id) {
       /*  this.http.delete('/book/'+id)
            .subscribe(res => {
                    this.router.navigate(['/books']);
                }, (err) => {
                    console.log(err);
                }
            ); */
        this.repository.deleteBook(id);
        this.router.navigate(['/books']);
    }

}
