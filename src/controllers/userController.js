import { getAllUsers, updateUser } from '../services/userService.js';

export const getUsers = async (req, res) => {
    const { user_id } = req.params;
    try {
        const users = await getAllUsers(user_id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const result = await updateUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
