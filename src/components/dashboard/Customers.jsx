import React, { useEffect, useState } from 'react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        username: '',
        employment_type: 'business', // Default selection
        domain: '',
        phone_number: '', // New field for phone number
    });

    useEffect(() => {
        // Fetch customers data from the backend
        fetch('http://localhost:8000/api/customers/')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // POST request to add new customer
        fetch('http://localhost:8000/api/customers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCustomer),
        })
        .then(response => response.json())
        .then(data => {
            setCustomers([...customers, data]); // Update customers state with new data
            setNewCustomer({ username: '', employment_type: 'business', domain: '', phone_number: '' }); // Clear form fields
            setShowForm(false); // Hide form after submission
        })
        .catch(error => console.error('Error adding customer:', error));
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Recent Customers</h2>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowForm(true)}
                >
                    + Add Customer
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={newCustomer.username}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Employment Type:
                        <select
                            name="employment_type"
                            value={newCustomer.employment_type}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        >
                            <option value="business">Business</option>
                            <option value="employee">Employee</option>
                        </select>
                    </label>
                    {newCustomer.employment_type === 'employee' && (
                        <label className="block mb-2">
                            Domain:
                            <input
                                type="text"
                                name="domain"
                                value={newCustomer.domain}
                                onChange={handleInputChange}
                                className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            />
                        </label>
                    )}
                    <label className="block mb-2">
                        Phone Number:
                        <input
                            type="text"
                            name="phone_number"
                            value={newCustomer.phone_number}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </form>
            )}

            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Customers;
