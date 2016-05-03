import { Component } from "@angular/core";
import { RouterLink } from "@angular/router-deprecated";

import { IPage } from "../../interfaces/page.interface";

import { DataService } from "../../services/data/data.service";

declare var require;
const styles: string = require("./nav.component.scss");
const template: string = require("./nav.component.html");

@Component({
    selector: "nav",
    directives: [
        RouterLink
    ],
    styles: [styles],
    template
})

export class NavComponent {
    pages: IPage[];

    constructor(dataService: DataService) {
        this.pages = dataService.pages;
    }
}
