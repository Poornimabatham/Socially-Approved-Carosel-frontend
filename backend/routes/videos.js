const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/videos.json');
const readVideos = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// GET /videos
router.get('/', (req, res) => {
  res.json(readVideos());
});

module.exports = router;
