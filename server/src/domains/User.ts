import bcrypt from 'bcrypt';

export class User {
    public id?: number | undefined;
    public name: string;
    public email: string;
    private passwordHash: string;
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

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash);
    }

    public async setPassword(password: string): Promise<void> {
        this.passwordHash = await bcrypt.hash(password, 10);
    }

    public get getPassword(): string {
        return this.passwordHash;
    }
}
