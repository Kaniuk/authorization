import React from 'react';
import {NavLink} from "react-router-dom";

const Car = ({car: {id, model, year, price}}) => (
    <NavLink to={`${id}`}>
        {id}.{model} - {year} - {price}
    </NavLink>
);


export {Car};