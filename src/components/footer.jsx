import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = ({ userGroup }) => {
    const location = useLocation();

    const managerOptions = [
        { path: "/dashboard/customers", icon: "fas fa-users", label: "Customers" },
        { path: "/dashboard/transactions", icon: "fas fa-exchange-alt", label: "Transactions" },
        { path: "/dashboard/profile", icon: "fas fa-user-tie", label: "Profile" },
        // { path: "/dashboard/stats", icon: "fas fa-chart-line", label: "Stats" },
    ];

    const getOptions = () => {
        switch (userGroup) {
            case 'shop_manager':
                return managerOptions;
            default:
                return [];
        }
    };

    const renderFooterOptions = () => {
        const options = getOptions();

        return options.map((option, index) => (
            <Link key={index} to={option.path} className={`text-center ${location.pathname === option.path ? 'text-blue-500' : 'text-gray-500'}`}>
                <div>
                    <i className={option.icon}></i>
                </div>
                <span>{option.label}</span>
            </Link>
        ));
    };

    return (
        <div className="fixed bottom-0 w-full bg-white border-t shadow-lg flex justify-around p-2 bg-gray-100">
            {renderFooterOptions()}
        </div>
    );
};

export default Footer;
