import { db } from '../config/database';

export const getAllUsers = async (user_id) => {
    const { rows } = await db.execute({
        sql: 'SELECT * FROM users WHERE user_id != ?',
        args: [user_id],
    });
    return rows;
};

export const updateUser = async ({ user_id, username, fullname }) => {
    const { rows } = await db.execute({
        sql: 'SELECT * FROM users WHERE username = ?',
        args: [username],
    });

    if (rows.length > 0) return { success: false, message: 'Username already exists' };

    const { rowsAffected } = await db.execute({
        sql: 'UPDATE users SET username = ?, fullname = ? WHERE user_id = ?',
        args: [username, fullname, user_id],
    });

    if (rowsAffected === 0) return { success: false, message: 'Failed to update user' };
    return { success: true, message: 'User updated successfully' };
};
