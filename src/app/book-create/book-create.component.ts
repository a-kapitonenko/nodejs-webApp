import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

@Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

    book: Book={} ;
    

    ngOnInit() {
    }

    constructor(private repository: BookRepository, private router: Router) { }
    saveBook() {
        this.repository.saveBook(this.book, null);
        
        this.router.navigate(['/books']);
        
        
        /* this.http.post('/book', this.book)
            .subscribe(res => {
                    let id = res['_id'];
                    this.router.navigate(['/book-details', id]);
                }, (err) => {
                    console.log(err);
                }
            );*/
    } 

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
