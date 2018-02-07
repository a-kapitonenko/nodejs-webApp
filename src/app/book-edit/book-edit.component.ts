import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {

    book : Book= {};

    constructor(private repository: BookRepository, private router: Router, private route: ActivatedRoute) {
       
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
