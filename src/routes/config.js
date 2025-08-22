import express from 'express';
import Config from '../models/config.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/config
router.get('/', authenticate(), async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = new Config(); // creates with default values
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/config
router.put('/', authenticate(), async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = new Config(req.body);
    } else {
      config.set(req.body);
    }
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
