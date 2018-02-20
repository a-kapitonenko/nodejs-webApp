import {Injectable} from '@angular/core';

@Injectable()
export class InterfaceService {
    private theme: string;
    private body: any;
    constructor() {
        this.theme = window.localStorage["theme"] || "light";
        this.body = document.getElementsByTagName('body')[0];
        this.body.classList.add(this.theme);
    }
    changeTheme() {
        if(this.theme == "light") {
            this.setTheme("dark");
            this.body.classList.remove("light");
            this.body.classList.add("dark");
        } else if(this.theme == "dark") {
            this.setTheme("light");
            this.body.classList.remove("dark");
            this.body.classList.add("light");
        }
    }
    setTheme(theme) {
        window.localStorage.setItem("theme",theme);
        this.theme = theme;
    }
}