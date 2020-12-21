import { Injectable } from "@angular/core";

@Injectable()
export class User {
    id: number = 0;
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    token: string = '';
}
