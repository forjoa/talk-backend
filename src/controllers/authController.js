import { getPayloadService, loginService, registerService } from '../services/authService.js';

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);
        if (result.success) {
            res.json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const result = await registerService(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPayload = async (req, res) => {
    try {
        const result = await getPayloadService(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
