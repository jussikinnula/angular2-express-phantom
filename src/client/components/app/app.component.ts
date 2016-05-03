import { Component } from "@angular/core";
import { RouteConfig, RouterOutlet } from "@angular/router-deprecated";
import { DOCUMENT } from "@angular/platform-browser";

import { NavComponent } from "../nav/nav.component";
import { PageComponent } from "../page/page.component";

import { DataService } from "../../services/data/data.service";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./app.component.html");

@Component({
    selector: "app",
    directives: [
        RouterOutlet,
        NavComponent
    ],
    styles: [styles],
    template
})

@RouteConfig([
    {
        path: '/:url',
        as: 'PageComponent',
        component: PageComponent,
        useAsDefault: true
    }
])

export class AppComponent {
    siteTitle: string;
    siteDescription: string;

    constructor(dataService: DataService) {
        this.siteTitle = dataService.siteTitle;
        this.siteDescription = dataService.siteDescription;
    }

    ngOnInit() {
        // We need to add meta description
        let metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = this.siteDescription;
        document.getElementsByTagName('head')[0].appendChild(metaDescription);
    }
}
