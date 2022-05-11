import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {CarForm} from "../../components";
import {carActions} from "../../redux";

const CarPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const car = useSelector(state => state.cars.cars[id]);

    useEffect(() => {
        if (!car) {
            dispatch(carActions.getCar(id));
        }
    }, [id]);

    if (!car) {
        return null;
    }

    const deleteHandler = () => {
        dispatch(carActions.deleteAsync(id));
        navigateToCars();
    };

    function navigateToCars() {
        navigate('/cars');
    }

    return (
        <div>
            <CarForm car={car} osSuccess={navigateToCars}/>
            {id}.{car.model} - {car.year} - {car.price}
            <button onClick={deleteHandler}>delete</button>
        </div>
    );
};

export {CarPage}