import { db } from '../config/database.js';

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

export async function getOtherUser(conversation_id, current_user_id) {
    const { rows } = await db.execute({
        sql: `
      SELECT 
          CASE 
              WHEN c.user1_id = ? THEN u2.user_id
              ELSE u1.user_id 
          END AS other_user_id,
          CASE 
              WHEN c.user1_id = ? THEN u2.username
              ELSE u1.username 
          END AS other_username,
          CASE 
              WHEN c.user1_id = ? THEN u2.fullname
              ELSE u1.fullname 
          END AS other_fullname
      FROM 
          conversations c
      JOIN 
          users u1 ON c.user1_id = u1.user_id
      JOIN 
          users u2 ON c.user2_id = u2.user_id
      WHERE 
          c.conversation_id = ?;
  `,
        args: [current_user_id, current_user_id, current_user_id, conversation_id],
    })

    return rows[0]
}
