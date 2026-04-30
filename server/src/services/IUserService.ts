import { User } from "../domains/User.js";

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getCurrentUser(id: number): Promise<User>;
}
