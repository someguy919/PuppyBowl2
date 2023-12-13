import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Player from './Player';
import AddPlayer from './AddPlayer';

function App() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2310/players');
        setPlayers(data.data.players);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  const create = async (newPlayer) => {
        const { data } = await axios.post('https://fsa-puppy-bowl.herokuapp.com/api/2310/players', newPlayer);
        setPlayers([...players, data.data.newPlayer]);
        navigate(`/players/${data.data.newPlayer.id}`);
    } 

const deletePlayer = async (playerId) => {
    await axios.delete(`https://fsa-puppy-bowl.herokuapp.com/api/2310/players/${playerId}`);
    setPlayers(players.filter((player) => player.id !== playerId));
    navigate('/');
  }

  const updatePlayer = async (playerId, updatedPlayer) => {
    try {
      const { data } = await axios.put(`https://fsa-puppy-bowl.herokuapp.com/api/2310/players/${playerId}`, updatedPlayer);
      setPlayers(players.map((player) => player.id === playerId ? data.data : player));
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };
  
  


  return (
    <div>
      <h1>Puppy Bowl</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>{player.name}</Link>
          </li>
        ))}
      </ul>

      <Routes>
      <Route path='/players/:id' element={<Player players={players} deletePlayer={deletePlayer} updatePlayer={updatePlayer} />} />
      </Routes>
    
      <AddPlayer create={create} />
    </div>
  );
}

export default App;

