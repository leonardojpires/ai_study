export class User {
    public id?: number | undefined;
    public name: string;
    public email: string;
    public passwordHash: string;
    public isAdmin: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: number | undefined,
        name: string,
        email: string,
        passwordHash: string,
        isAdmin: boolean,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id ?? undefined;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public isAdminUser(): boolean {
        return this.isAdmin;
    }
}