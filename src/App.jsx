import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Footer from './components/footer';
import Customers from './components/dashboard/Customers';
import Transactions from './components/dashboard/Transactions';
import ManagerProfile from './components/dashboard/Managers';
import Stats from './components/dashboard/Stats';


const App = () => {
    const [userGroup, setUserGroup] = useState(null);
    const [username, setUsername] = useState(null);

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-300">
                <div className="flex-grow">
                    {/* {userGroup && <Logout setGroup={setUserGroup} />} */}
                    <Routes>
                        <Route path="/" element={
                            userGroup ? (
                                userGroup === 'shop_manager' ? (
                                    <Navigate to="/dashboard/customers" />
                                ) : (
                                    <Navigate to="/manager_dashboard/customers" />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        } />
                        <Route path="/login" element={<Login setGroup={setUserGroup} setUsername={setUsername} />} />
                        {userGroup && (
                            <>
                                {userGroup === 'shop_manager' && (
                                    <>
                                        <Route index element={<Navigate to="/dashboard/customers" />} />
                                        <Route path="/dashboard/customers" element={<Customers />} />
                                        <Route path="/dashboard/transactions" element={<Transactions />} />
                                        <Route path="/dashboard/profile" element={<ManagerProfile id={username} />} />
                                        <Route path="/dashboard/stats" element={<Stats />} />
                                    </>
                                )}
                            </>
                        )}
                    </Routes>
                </div>
                {userGroup && <Footer userGroup={userGroup} />}
            </div>
        </Router>
    );
};

export default App;
