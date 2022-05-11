import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: {},
    status: null,
    formErrors: {}
};

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async () => {
        const {data} = await carService.getAll();
        return data;
    }
);


const getCar = createAsyncThunk(
    'carSlice/getCar',
    async (id) => {
        const {data} = await carService.getById(id);
        return data;
    }
);

const createAsync = createAsyncThunk(
    'carSlice/createAsync',
    async ({car}, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await carService.create(car);
            return data;
        } catch (e) {
            return rejectWithValue({status: e.message, formErrors: e.response.data});
        }
    }
);

const deleteAsync = createAsyncThunk(
    'carSlice/deleteAsync',
    async (id, {rejectWithValue}) => {
        try {
            await carService.delete(id);
            return id;
        } catch (e) {
            return rejectWithValue({status: e.message, formErrors: e.response.data});
        }
    }
);
const updateAsync = createAsyncThunk(
    'carSlice/updateAsync',
    async (car, {rejectWithValue}) => {
        try {
            const {data} = await carService.update(car.id, car);
            return data;
        } catch (e) {
            return rejectWithValue({status: e.message, formErrors: e.response.data});
        }
    }
);


const carSlice = createSlice({
    name: 'carSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'completed';
                state.cars = action.payload.reduce((carsMap, car) => {
                    carsMap[car.id] = car;
                    return carsMap;
                }, {});
            })
            .addCase(getCar.fulfilled, (state, {payload: car}) => {
                state.cars[car.id] = car;
            })
            .addCase(createAsync.fulfilled, (state, {payload: car}) => {
                state.cars[car.id] = car;
            })
            .addCase(updateAsync.fulfilled, (state, {payload: car}) => {
                state.cars[car.id] = car;
            })
            .addCase(createAsync.rejected, (state, action) => {
                debugger
                const {status, formErrors} = action.payload;
                state.status = status;
                state.formErrors = formErrors;
            })
            .addCase(deleteAsync.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.cars[id];
            });
    }
});


const {reducer: carReducer} = carSlice;

const carActions = {
    getAll,
    getCar,
    createAsync,
    deleteAsync,
    updateAsync
};

export {
    carReducer,
    carActions
};