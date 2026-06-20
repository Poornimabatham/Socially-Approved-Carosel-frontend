const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/videos.json');
const readVideos = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeVideos = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// POST /share  { videoId, platform }
router.post('/', (req, res) => {
  const { videoId, platform } = req.body;
  if (!videoId) return res.status(400).json({ error: 'videoId required' });

  const videos = readVideos();
  const video = videos.find((v) => v.id === videoId);
  if (!video) return res.status(404).json({ error: 'Video not found' });

  video.shares += 1;
  writeVideos(videos);
  res.json({ success: true, shares: video.shares, platform });
});

module.exports = router;
