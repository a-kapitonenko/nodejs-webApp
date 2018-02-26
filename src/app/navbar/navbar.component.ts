import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { FullscreenService } from '../fullscreen.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';
import { InterfaceService } from '../model/interface.service';
import {TranslateService} from '@ngx-translate/core';
import { DialogService } from '../dialog.service';

@Component({
  	selector: 'app-navbar',
  	templateUrl: './navbar.component.html',
  	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  	private subscriptions: Subscription[] = [];
	  fullscreen$ :boolean;
	  input: string = null;
	  curLang: string = null;
  	ngOnInit() {
  		const subscription = this.fullScreenService.fullscreen$.subscribe((fullscreen$)=> {
      		this.fullscreen$ = fullscreen$;
    	});
		  this.subscriptions.push(subscription);

  	}
  	ngOnDestroy() {
  		this.subscriptions.forEach(s => s.unsubscribe());
  	}
  	constructor(private router: Router, private repository: BookRepository, 
		private fullScreenService: FullscreenService, private userRepository: UserRepository,
		private interfaceService: InterfaceService,  public translate: TranslateService,private dialog: DialogService ) { 
			this.curLang=translate.currentLang;
  	}
  	get categories():string[] {
    	return this.repository.getCategories();
	}
	logout() {
		this.userRepository.selectUser(null);
		this.userRepository.logout();
		this.router.navigate(['']);
	}
	changeTheme() {
		this.interfaceService.changeTheme();
	}

	changeLang() {
		if(this.curLang=='ru'){
			this.curLang='en';
			
		} else {
			this.curLang='ru';
		}
		this.translate.use(this.curLang);
	}
	createBook() {
		if(this.userRepository.selectedUser == null) {
			this.dialog.openNotificationDialog("Please, signin", 0);
		}else {
			this.router.navigate(['book-create', this.userRepository.selectedUser._id]);
		}
	}
}