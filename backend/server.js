const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mine')
.then(() => console.log('Mongo conected'))
.catch((err) => console.error(err));

const gameSchema = new mongoose.Schema({
    title: String,
    embedUrl: String
});

const Game = mongoose.model('Game', gameSchema);
// Example endpoint: Get games with optional pagination
app.get('/api/games', async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const games = await Game.find().skip(skip).limit(limit);
    res.json(games);
  });
  
  // Seed games (optional one-time route)
  app.get('/api/seed', async (req, res) => {
    await Game.deleteMany({});
    await Game.insertMany([
        { title: 'Tetris', embedUrl: 'https://mrbid.github.io/cubeshooter/' },
        { title: 'ok', embedUrl: 'https://mrbid.github.io/snowboarder/' },
        
    ]);
    res.send('Database seeded!');
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`server running in port ${PORT}`));
