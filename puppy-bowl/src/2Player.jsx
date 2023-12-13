import { useParams } from 'react-router-dom'; // Corrected useParams
import { useState } from 'react';

const Player = ({ players }) => {
  const params = useParams();
  const id = parseInt(params.id); // Corrected to parseInt for clarity
  const player = players.find((player) => player.id === id); // Corrected find method

  if (!player) {
    return null; 
  }



  return (
    <div>
  <h2>{player.name}</h2>
    <h4>Breed: {player.breed}</h4>
     <h4>Status: {player.status}</h4>
    <img src={player.imageUrl} />

    </div>

  );
};

export default Player;
