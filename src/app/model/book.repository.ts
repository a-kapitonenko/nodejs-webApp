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
        
        this.http.get('/book/categories').subscribe(data => {
            console.log(data);
            this.categories = data;
        });
    }

    ngOnInit() {
    
    }

    getBooks(): Observable<any> { 
        return this.http.get('/book').map(data => {
            console.log(data);
            return data;
        });
        
    }

    getBestBooks(): Observable<any> { 
        return this.http.get('/book/best').map(data => {
                console.log("best books from repository"); 
                console.log(data); 
                return data; 
        }); 
        
    }

    getBook(id: number): Observable<any> {
        /* let loadBook=this.loadBooks.find(p => p._id == id);
        if(loadBook!=undefined){
            console.log("saved book");
            return loadBook;
        } else { */
            return this.http.get('/book/'+id).map(data => {
                console.log(data);
                //this.loadBooks.push(data);
                return data;
            });
        //}

        
        //return this.books.find(p => p._id == id);
        
    }

    getAllTags(): Observable<any> {
        return this.http.get('/book/tags').map(data => {
            console.log("All tags"+data);
            return data;
        });
    }

    getBookTags(id: number): Observable<any> {
        return this.http.get('/book/tags/'+id).map(data => {
            console.log(data);
            return data;
        });
    }

    getTag(id: string): Observable<any> {
        /* let loadBook=this.loadBooks.find(p => p._id == id);
        if(loadBook!=undefined){
            console.log("saved book");
            return loadBook;
        } else { */
            return this.http.get('/book/tag/'+id).map(data => {
                console.log(data);
                return data;
            });
        //}

        
        //return this.books.find(p => p._id == id);
        
    }

    saveTags(tags: any[], book: any) {
        if(book==null) return;
        let alltags: any;
        this.getAllTags().subscribe((res)=>{
            alltags = res;
            for(let tag of tags){
            if(tag.books==undefined) tag.books=[];           
            let curTag = alltags.find(p => p.name == tag.name);
            if(curTag!=undefined){
                if(curTag.books.findIndex(p=>p==book._id)==-1) curTag.books.push(book._id);
                this.http.put('/book/tag/'+curTag._id, curTag)
                 .subscribe();
                 console.log(curTag.name+"tag uptated:"+book._id);
            }else {
                tag.books.push(book._id);
                console.log(book._id);
                this.http.post('/book/tag', tag)
                 .subscribe();
                 console.log(tag.name+"tag saved:"+book._id);
            }
        }
        });
    }
       

    getCategories(): string[] {
        return this.categories;
    }

    deleteTagBook(book: any, tag: any){
        /* this.getAllTags().subscribe(res=>{
            let tag=res.find(p=>p.name==tagName);
            console.log(tag);
            tag.books.splice(tag.books.findIndex(p=>p==book._id),1);
            
        }); */
        //this.getTag(tagId).subscribe(res=>{
           // let tag=res;
            tag.books.splice(tag.books.findIndex(p=>p==book._id),1);
            this.http.put('/book/tag/'+tag._id, tag)
                 .subscribe();
       // });
        
    }

    saveBook(book: Book, id: number, tags: any[]) {
        book.updated_date = new Date().toString();
        console.log(book.updated_date);
        if (id == null || id == 0) {
            this.http.post('/book', book)
            .subscribe(res => {
                this.books.push(res);
                if(tags!=null) this.saveTags(tags,res);
            });
        } else {
            this.http.put('/book/'+id, book)
            .subscribe(res => {
                this.books.splice(this.books.
                findIndex(p => p._id == id), 1, book);
                if(tags!=null) this.saveTags(tags,res);
            });
        }
    }

    findBooksByAuthor(id: number): Observable<any> {
        return this.http.get('/book/findauth/'+id).map(data => {
            console.log(data);
            return data;
        });        
}

    searchBooks(text: string): Observable<any> {
            return this.http.get('/book/find/'+text).map(data => {
                console.log(data);
                return data;
            });        
    }

    deleteBook(id: number) {
        this.getBookTags(id).subscribe(res=>{
            for(let tag of res){
                tag.books.splice(tag.books.findIndex(res=>res==id),1);
                this.http.put('/book/tag/'+tag._id, tag)
                .subscribe();
            }
        });
        this.http.delete('/book/'+id)
            .subscribe(res => {
            this.books.splice(this.books.
            findIndex(res => res._id == id), 1);
        })
    }
}
