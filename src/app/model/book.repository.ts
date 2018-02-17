import { Injectable,OnInit } from "@angular/core";
import { Book } from "./book.model";
import { Tag } from "./tag.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class BookRepository implements OnInit {
    private books: any=[];
    private book: any={};
    private loadBooks: any[]=[];
    private categories: any = [];
    

    constructor(private http: HttpClient) {
        console.log("in get book constructor");
        this.http.get('/book').subscribe(data => {
            this.books = data;
            console.log(data);
        });
        this.http.get('/book/categories').subscribe(data => {
            console.log(data);
            this.categories = data;
        });
    }

    ngOnInit() {
    
    }

    getBooks(category: string = null): Book[] {
        return this.books
            .filter(p => category == null || category == p.category);
    }

    getBook(id: number): Observable<Object> {
        /* let loadBook=this.loadBooks.find(p => p._id == id);
        if(loadBook!=undefined){
            console.log("saved book");
            return loadBook;
        } else { */
            return this.http.get('/book/'+id).map(data => {
                console.log(data);
                this.loadBooks.push(data);
                return data;
            });
        //}

        
        //return this.books.find(p => p._id == id);
        
    }

    getAllTags(): Observable<Object> {
        return this.http.get('/book/tags').map(data => {
            console.log(data);
            return data;
        });
    }

    getBookTags(id: number): Observable<Object> {
        return this.http.get('/book/tags/'+id).map(data => {
            console.log(data);
            return data;
        });
    }

    saveTag(tag: any) {
        let alltags: any;
        this.getAllTags().subscribe((res)=>{
            alltags = res;
            if(alltags.find(p => p._id == tag._id)){
                this.http.put('/book/tag/'+tag._id, tag)
                 .subscribe();
            }else {
                this.http.post('/book/tag', tag)
                 .subscribe();
            }
        });
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

    deleteBook(id: number) {
        this.http.delete('/book/'+id)
            .subscribe(res => {
            this.books.splice(this.books.
            findIndex(res => res._id == id), 1);
        })
    }
}
