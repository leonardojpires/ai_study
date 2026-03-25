import { RowDataPacket } from 'mysql2';
import { pool } from '../database/db.js';
import { User } from '../domains/User.js';
import { IUserRepository } from './../domains/IUserRepository.js';

/* 
    pool is the connection to the database
    ('pool' would be the same as 'db' => db.query<RowDataPacket[]>(...))
*/

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

        const user = users[0];

        if (!user) return null;

        return new User(user.id, user.name, user.email, user.password_hash, user.isAdmin, user.createdAt, user.updatedAt);
    }

    async findById(id: number): Promise<User | null> {
        const [users]= await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);

        const user = users[0];

        if (!user) return null;

        return new User(user.id, user.name, user.email, user.password_hash, user.isAdmin, user.createdAt, user.updatedAt);
    }

    async save(user: User): Promise<void> {
        if (user.id) {
            await pool.query('UPDATE users SET name = ?, email = ?, password_hash = ?, is_admin = ? WHERE id = ?', [user.name, user.email, user.getPassword, user.isAdmin, user.id]);
        } else {
            await pool.query('INSERT INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, ?)', [user.name, user.email, user.getPassword, user.isAdmin]);
        }
    }

    async delete(user: User): Promise<void> {
        if (user.id) {
            await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
        }
    }
}
