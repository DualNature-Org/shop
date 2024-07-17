import React, { useEffect, useState } from 'react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        product_name: '',
        quantity: 0,
        total_price: 0,
        location: '',
        customer_id: '', // Use customer_id instead of customer
    });

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        print(token)

        // Fetch transactions data from the backend
        fetch('http://localhost:8000/api/transactions/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Error fetching transactions:', error));
        
        // Fetch customers data from the backend
        fetch('http://localhost:8000/api/customers/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Get the token from local storage
        // POST request to add new transaction
        fetch('http://localhost:8000/api/transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`, // Include the token in the headers
            },
            body: JSON.stringify(newTransaction),
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {  // Check if the response includes a transaction ID
                setTransactions([...transactions, data]); // Update transactions state with new data
                setNewTransaction({ product_name: '', quantity: 0, total_price: 0, location: '', customer_id: '' }); // Clear form fields
                setShowForm(false); // Hide form after submission
            } else {
                console.error('Error adding transaction:', data);
            }
        })
        .catch(error => console.error('Error adding transaction:', error));
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Recent Transactions</h2>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowForm(true)}
                >
                    + Add Transaction
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block mb-2">
                        Product Name:
                        <input
                            type="text"
                            name="product_name"
                            value={newTransaction.product_name}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={newTransaction.quantity}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Total Price:
                        <input
                            type="number"
                            name="total_price"
                            value={newTransaction.total_price}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={newTransaction.location}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Customer:
                        <select
                            name="customer_id" // Use customer_id
                            value={newTransaction.customer_id}
                            onChange={handleInputChange}
                            className="border-gray-300 border-solid border rounded-md px-3 py-2 mt-1 w-full"
                            required
                        >
                            <option value="">Select a customer</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {transaction.product_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {transaction.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${transaction.total_price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {transaction.location}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
