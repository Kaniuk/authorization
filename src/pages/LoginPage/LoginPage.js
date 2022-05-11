import React from 'react';
import {Link} from "react-router-dom";

import {AuthForm} from "../../components";

const LoginPage = () => {
    localStorage.clear();
    return (
        <div>
            <AuthForm/>
            <Link to={'/register'}>Register</Link>
        </div>
    );
};

export {LoginPage};