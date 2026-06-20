const express = require('express');
const cors = require('cors');
const videosRouter = require('./routes/videos');
const likesRouter = require('./routes/likes');
const sharesRouter = require('./routes/shares');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/videos', videosRouter);
app.use('/like', likesRouter);
app.use('/share', sharesRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
