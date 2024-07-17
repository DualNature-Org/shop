import React, { useEffect, useState } from 'react';

const Managers = () => {
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        // Fetch managers data from the backend
        fetch('http://localhost:8000/api/managers/')
            .then(response => response.json())
            .then(data => setManagers(data))
            .catch(error => console.error('Error fetching managers:', error));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Managers</h2>
            <ul>
                {managers.map(manager => (
                    <li key={manager.id}>{manager.user.username}</li>
                ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add Manager</button>
        </div>
    );
};

export default Managers;
