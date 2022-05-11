import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {userService} from "../../services";
import {authActions} from "../../redux";

const AuthForm = () => {
    const {register, handleSubmit} = useForm();
    const [isLogin, setIsLogin] = useState(null);
    const {pathname,state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        pathname === '/register' ? setIsLogin(false) : setIsLogin(true);
    }, [pathname]);

    async function submit(user) {
        try {
            if (!isLogin) {
                await userService.create(user);
                navigate('/login')
            } else {
                await dispatch(authActions.login({user}))
                navigate(state?.pathname || '/', {replace: true})
            }
        } catch (e) {
            console.log('dddddd');
            console.log(e.response);
            // setErrors(e.response.data)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>{isLogin ? 'login' : 'register'}</button>
        </form>
    );
};

export {AuthForm};