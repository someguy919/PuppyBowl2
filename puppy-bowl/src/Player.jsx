import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Player = ({ players, deletePlayer, updatePlayer }) => {
    const params = useParams();
    const id = parseInt(params.id, 10);

    const [player, setPlayer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [status, setStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const foundPlayer = players.find((p) => p.id === id);
        if (foundPlayer) {
            setPlayer(foundPlayer);
            setName(foundPlayer.name);
            setBreed(foundPlayer.breed);
            setStatus(foundPlayer.status);
            setImageUrl(foundPlayer.imageUrl);
        }
    }, [id, players]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedPlayer = {
            id,
            name, 
            breed,
            status,
            imageUrl
        };
        updatePlayer(id, updatePlayer);
        setEditMode(false);
    };

    if (!player) {
        return <div>Player not found</div>;
    }

    return (
        <div>
            {!editMode ? (
                <div>
                    <h2>{player.name}</h2>
                    <h4>Breed: {player.breed}</h4>
                    <h4>Status: {player.status}</h4>
                    <img src={player.imageUrl} alt={player.name} />
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={() => deletePlayer(player.id)}>Delete</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input 
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Breed:
                            <input 
                                type="text"
                                value={breed}
                                onChange={(event) => setBreed(event.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Status:
                            <select 
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="field">Field</option>
                                <option value="bench">Bench</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Image URL:
                            <input 
                                type="text"
                                value={imageUrl}
                                onChange={(event) => setImageUrl(event.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">Update Player</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Player;
