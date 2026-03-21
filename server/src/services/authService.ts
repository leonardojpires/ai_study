import { IUserRepository } from "../domains/IUserRepository.js";
import { User } from "../domains/User.js";
import bcrypt from 'bcrypt';


export class AuthService {
    constructor(private userRepository: IUserRepository) {}

    async register(name: string, email: string, password: string) {
        if (!name || !email || !password) throw new Error("Invalid input.");

        const user = await this.userRepository.findByEmail(email);

        if (user) throw new Error('User already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User(undefined, name, email, hashedPassword, false, new Date(), new Date());

        await this.userRepository.save(newUser);

        return {
            message: "Registration successful",
            newUser
        }
    }

    async login(email: string, password: string) {
        if (!email || !password) throw new Error("Invalid input.");

        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new Error("This user does not exist.");

        const isPasswordValid = await user.checkPassword(password);

        if (!isPasswordValid) throw new Error("Invalid password.");

        return {
            message: "Login successful",
            user
        }
    }
}
