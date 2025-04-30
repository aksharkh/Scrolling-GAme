import { useState, useEffect } from 'react';
import './App.css';
import SwipeableViews from 'react-swipeable-views';

function App() {
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);

  const fetchGames = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/games?skip=${offset}&limit=5`);
      const data = await res.json();
      if (data.length > 0) {
        setGames(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [offset]);

  const handleChangeIndex = (i) => {
    setIndex(i);

    // Load more if near end and not already fetching
    if (i >= games.length - 2) {
      setOffset(prev => prev + 5);
    }
  };

  return (
    <div className="App">
      <SwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        resistance
      >
        {games.map((game, idx) => (
          <div key={idx} className="slide">
            <h2>{game.title}</h2>
            <iframe
              src={game.embedUrl}
              title={game.title}
              width="100%"
              height="400"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
}

export default App;
