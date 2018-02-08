export class User {
    constructor(
    public email?: string,
    public password?: string,
    public name?: string,
    public isActive?: boolean,
    public isBlocked?: boolean) { }
}