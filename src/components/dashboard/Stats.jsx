import React, { useEffect, useState } from 'react';

const Stats = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        // Fetch stats data from the backend
        fetch('https://dualnature.xyz/api/stats/')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Stats</h2>
            <div>Total Transactions: {stats.total_transactions}</div>
            <div>Total Revenue: ${stats.total_revenue}</div>
        </div>
    );
};

export default Stats;
