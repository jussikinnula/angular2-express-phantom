import { Component } from "@angular/core";
import { RouteParams } from "@angular/router-deprecated";
import { DOCUMENT } from "@angular/platform-browser";

import { IPage } from "../../interfaces/page.interface";

import { DataService } from "../../services/data/data.service";

declare var require;
const styles: string = require("./page.component.scss");
const template: string = require("./page.component.html");

@Component({
    selector: "page",
    styles: [styles],
    template
})

export class PageComponent {
    page: IPage;
    title: string;

    constructor(routeParams: RouteParams, dataService: DataService) {
        let url = routeParams.params['url'];
        this.page = dataService.getPage(url);
        if (!this.page) {
            this.page = {
                url: null,
                title: "Not Found",
                description: "The page you tried to find was not found"
            };
        }
        this.title = dataService.siteTitle + ' - ' + this.page.title;
    }

    ngOnInit() {
        // We need to update the page title
        document.title = this.title;
    }
}
