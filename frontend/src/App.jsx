import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SwipeableViews from 'react-swipeable-views'


function App() {
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchGames = async () =>{
    const res = await fetch (`http://localhost:5000/api/games?skip=${offset}&limit=5`);
    const data = await res.json();
    console.log('fetched data', data);
    setGames(prev => [...prev, ...data]);
  }

  useEffect(() => {
    fetchGames();
  },[offset]);

  const handleChangeIndex = (index) =>{
    if(index === games.length - 1){
      setOffset(prev => prev + 5);
    }
  }
  return (
    <>
      <SwipeableViews>
        {games.map((game, idx) => (
          <div key={idx} className='slide'>
            <h2>{game.title}</h2>
            <iframe
            src={game.embedUrl}
            widh="100%"
            height="80%"
            frameBorder="0"
            allowFullScreen
            />
          </div>
        ))}
      </SwipeableViews>
    </>
  )
}

export default App
