import {axiosService} from "./axios.service";
import {urls} from "../constants";

const carService = {
    getAll: () => axiosService.get(urls.cars),
    getById: (id) => axiosService.get(`${urls.cars}/${id}`),
    create: (car) => axiosService.post(urls.cars, car),
    delete: (id) => axiosService.delete(`${urls.cars}/${id}`),
    update: (id, car) => axiosService.put(`${urls.cars}/${id}`, car)
};

export {
    carService
};