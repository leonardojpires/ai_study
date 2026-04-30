import { UserRepository } from "../repositories/userRepository.js";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getAllUsers() {
        const users = await this.userRepository.findAll();

        if (!users) throw new Error("No users found.");

        return users;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findById(id);

        if (!user) throw new Error("User not found.");

        return user;
    }

    async getCurrentUser(id: number) {
        const user = await this.userRepository.getCurrentUser(id);

        if (!user) throw new Error("User not found.");

        return user;
    }
}