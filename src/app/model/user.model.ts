export class User {
    constructor(
    public email?: string,
    public password?: string,
    public first_name?: String,
    public second_name?: String,
    public role?: String,
    public isActive?: boolean,
    public isBlocked?: boolean) { }
}