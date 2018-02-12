import { Injectable } from '@angular/core';
    import { Router, NavigationEnd } from '@angular/router';
    import { Observable } from 'rxjs/Observable';
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/filter';

    @Injectable()
    export class FullscreenService {
        fullscreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
        setFullScreen(fullscreen$: boolean) {
          this.fullscreen$.next(fullscreen$); 
        }
    }