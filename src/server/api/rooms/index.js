import { Router } from 'express';

import Room from '../../models/room.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find().exec();

        if (!rooms.length) {
            return res.status(204).end();
        }

        return res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).end(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        const room = new Room({
            name,
        });

        const result = await room.save();

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).end(err.message);
    }
});

export default router;
