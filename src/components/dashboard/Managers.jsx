import React, { useEffect, useState } from 'react';

const ManagerProfile = (props) => {
    const [manager, setManager] = useState(null);
    const [transactionCount, setTransactionCount] = useState(0);

    useEffect(() => {


    const fetchManager = () => {
        fetch(`http://16.171.44.65:8000/api/managers/${props.username}/`)
            .then(response => response.json())
            .then(data => setManager(data))
            .catch(error => console.error('Error fetching manager:', error));
    };
    }, []);

    return (
        <div className="p-4">
            {manager && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Manager Profile</h2>
                    <p><strong>Username:</strong> {manager.user.username}</p>
                    <p><strong>Email:</strong> {manager.user.email}</p>
                    <p><strong>Name:</strong> {manager.user.first_name} {manager.user.last_name}</p>
                </div>
            )}

        </div>
    );
};

export default ManagerProfile;
