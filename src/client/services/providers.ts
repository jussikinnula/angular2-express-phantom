import { provide } from "@angular/core";

import { DataService } from "./data/data.service";
import { UserService } from "./user/user.service";

export const SERVICE_PROVIDERS: any[] = [
    DataService,
    UserService
];