import React, { useState } from 'react';

const AddPlayer = ({ create}) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [status, setStatus] = useState('bench'); 
    const [imageUrl, setImageUrl] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPlayer = {
            name,
            breed,
            status: status || 'bench', 
            imageUrl: imageUrl || undefined 
        };
        create(newPlayer);

       
        setName('');
        setBreed('');
        setStatus('bench');
        setImageUrl('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                        <h3>Add New Player</h3>
       
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
                <div>
                    <button type="submit">Add New Player</button>
                </div>
            </form>
        </div>
    );
};

export default AddPlayer;
