import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    store: any = {};

    constructor() {}

    update(key, value) {
        this.store[key] = value;
        return this.store[key];
    }

    get(key) {
        return this.store[key];
    }

    delete(key) {
        if (this.store[key]) {
            delete this.store[key];
        }
        return true;
    }
}