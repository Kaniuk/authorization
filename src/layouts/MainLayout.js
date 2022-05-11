import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <h1>My cars</h1>
            <Outlet/>
        </div>
    );
};

export {MainLayout};