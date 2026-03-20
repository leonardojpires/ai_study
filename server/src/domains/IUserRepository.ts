import { User } from "./User.js";

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;

    save(user: User): Promise<void>;
    delete(user: User): Promise<void>;
}
