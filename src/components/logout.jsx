import React from 'react';

const Logout = ({ setGroup }) => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setGroup(null);
            }
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return <button onClick={handleLogout}>Logout</button>
};

export default Logout;
