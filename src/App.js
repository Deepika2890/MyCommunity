import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [communityName, setCommunityName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [invites, setInvites] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newInvite = { communityName, eventDate };
        await axios.post('/api/invites', newInvite);
        setCommunityName('');
        setEventDate('');
        fetchInvites();
    };

    const fetchInvites = async () => {
        const response = await axios.get('/api/invites');
        setInvites(response.data);
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    return (
        <div className="App">
            <h1>Community Nights</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    placeholder="Community Name"
                    required
                />
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
                <button type="submit">Send Invitation</button>
            </form>
            <div className="invites">
                <h2>Invitations:</h2>
                {invites.map((invite, index) => (
                    <p key={index}>
                        {invite.communityName} on {invite.eventDate}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default App;
