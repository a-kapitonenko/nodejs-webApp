import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookRepository {
    private books: any=[];
    private categories: any = [];
    constructor(private http: HttpClient) {
        this.http.get('/book').subscribe(data => {
            this.books = data;
        });
        this.http.get('/book/categories').subscribe(data => {
            console.log(data);
            this.categories = data;
        });
    }
    getBooks(category: string = null): Book[] {
        return this.books
            .filter(p => category == null || category == p.category);
    }
    getBook(id: number): any {
        return this.books.find(p => p._id == id);
        
    }
    getCategories(): string[] {
        return this.categories;
    }
    saveBook(book: Book, id: number) {
        if (id == null || id == 0) {
            this.http.post('/book', book)
            .subscribe(res => this.books.push(res));
        } else {
            this.http.put('/book/'+id, book)
            .subscribe(res => {
                this.books.splice(this.books.
                findIndex(p => p._id == id), 1, book);
            });
        }
    }
    /* createBook(book: Book){
        this.http.post('/book', book)
            .subscribe(res => {
                    let id = res['_id'];

                }, (err) => {
                    console.log(err);
                }
            );
    }

    editBook(book: Book):number {

        this.http.put('/book/'+book.id, book)
            .subscribe(res => {
                    //ID = res['_id'];
                    
                }, (err) => {
                    console.log(err);
                }
            );
            return book.id;
            //return ID;
    } */
    deleteBook(id: number) {
        this.http.delete('/book/'+id)
            .subscribe(res => {
            this.books.splice(this.books.
            findIndex(res => res._id == id), 1);
        })
    }
}
