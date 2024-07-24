import { getMyChats, searchUser, getConversation, insertMessage } from '../services/chatService';

export const myChats = async (req, res) => {
    const { id } = req.params;
    try {
        const chats = await getMyChats(id);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchForUser = async (req, res) => {
    const { username } = req.query;
    try {
        const users = await searchUser(username);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const conversation = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        const conversation = await getConversation(conversation_id);
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        await insertMessage(req.body);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
