import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { BookRepository } from "../model/book.repository";
import {ImageuploadService} from '../imageUpload.service';
import { Observable } from 'rxjs/Observable'; 
import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';
import {MatTableDataSource, MatSort} from '@angular/material';
import { DateService } from '../date.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public downloadURL: Observable<string>;
  isLoading=false;

  user: any={};
  books: any=[];
  dataSource: any;

  displayedColumns = [ 'title', 'options'];

  @ViewChild(MatSort) sort: MatSort;

  public dropped(event: UploadEvent) {
      this.isLoading = true;
      for (const file of event.files) {
          file.fileEntry.file(info => {
            this.imageService.sendFile(info).subscribe(res => {
              this.user.image=res;
              this.isLoading = false;
              this.cdRef.detectChanges();
              this.userRepository.saveUser(this.user._id,this.user);                   
          });;
      });
      }    
   } 

   otherImage(){
    this.downloadURL = null;      
  }        

  saveEditable(value) {
    this.userRepository.saveUser(this.user._id,this.user);        
  }

  loadBooks(){
    this.bookRepository.findBooksByAuthor(this.user._id).subscribe(res=>{
      this.books=res;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.sort = this.sort;
    });
  }

  deleteBook(id) {
    console.log(this.books.findIndex(p=>p._id==id));
    this.dataSource.data.splice(this.dataSource.data.findIndex(p=>p._id==id),1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.bookRepository.deleteBook(id);      
  }

  constructor(private imageService: ImageuploadService, private userRepository: UserRepository,
    private cdRef:ChangeDetectorRef, private bookRepository: BookRepository, private dateService: DateService,
    private router: Router) {    
    }

  ngOnInit() {
    setTimeout(()=>{
        this.user = this.userRepository.selectedUser;
        this.loadBooks();
    },700);
   
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  onRowClicked(row) {
    this.router.navigate(['/book-details/',row._id]);
}

}



