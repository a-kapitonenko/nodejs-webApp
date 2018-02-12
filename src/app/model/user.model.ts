export class User {
    constructor(
    public email?: string,
    public password?: string,
    public username?: String,
    public realname?: String,
    public role?: String,
    public isActive?: boolean,
    public isBlocked?: boolean) { }
}