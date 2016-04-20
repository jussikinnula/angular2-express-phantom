import { Injectable } from "angular2/core";

import { IPage } from "../../interfaces/page.interface";

@Injectable()
export class DataService {
    siteTitle: string;
    siteDescription: string;
    defaultRoute: string;
    pages: IPage[];

    constructor() {
        let data = require('./data.json');
        this.siteTitle = data['siteTitle'];
        this.siteDescription = data['siteDescription'];
        this.pages = data['pages'];
    }

    getPage(url: string) {
        return this.pages.filter((page: IPage) => {
            return page.url == url;
        })[0];
    }
}