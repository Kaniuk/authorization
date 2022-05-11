import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../../redux";

const CarForm = ({car, osSuccess}) => {
    const {formErrors} = useSelector(state => state.cars);

    const {register, reset, handleSubmit} = useForm({defaultValues: car});
    const dispatch = useDispatch();

    const submit = async (newCar) => {
        const action = car ? carActions.updateAsync(newCar) : carActions.createAsync({car: newCar});
        await dispatch(action);
        reset();
        osSuccess?.();
    };

    return (

        <form onSubmit={handleSubmit(submit)}>

            <div><label>model:<input type="text"{...register('model')}/></label></div>
            {formErrors.model && <span>{formErrors.model[0]}</span>}
            <div><label>price:<input type="text"{...register('price')}/></label></div>
            {formErrors.price && <span>{formErrors.price[0]}</span>}
            <div><label>year:<input type="text"{...register('year')}/></label></div>
            {formErrors.year && <span>{formErrors.year[0]}</span>}

            <button>{car ? 'Update' : 'Save'}</button>
        </form>

    );
};

export {CarForm};