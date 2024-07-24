import { db } from '../config/database';
import { encrypt, hashPasswords } from '../utils/encryption';

export const loginService = async ({ username, password }) => {
    const { rows } = await db.execute({
        sql: 'SELECT * FROM users WHERE username = ?',
        args: [username],
    });

    if (rows.length !== 1) {
        return { success: false, message: 'Username is not registered' };
    }

    if (!(await compare(password, rows[0].password))) {
        return { success: false, message: 'Wrong password' };
    }

    const session = await encrypt(rows[0]);
    return { success: true, session };
};

export const registerService = async ({ username, fullname, password }) => {
    const hashedPassword = await hashPasswords(password);

    const { rows } = await db.execute({
        sql: 'SELECT * FROM users WHERE username = ?',
        args: [username],
    });

    if (rows.length > 0)
        return { success: false, message: 'Username already exists' };

    await db.execute({
        sql: 'INSERT INTO users (username, fullname, password) VALUES (?,?,?)',
        args: [username, fullname, hashedPassword],
    });

    return { success: true };
};
