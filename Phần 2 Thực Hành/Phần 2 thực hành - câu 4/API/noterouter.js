const express = require('express');
const router = express.Router();
const Note = require('./Note');

// GET /api/notes: Lấy danh sách ghi chú mới nhất trước
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/notes: Tạo ghi chú mới
router.post('/', async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;