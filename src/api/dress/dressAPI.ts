import axios, {AxiosResponse} from "axios";
import {API_HOST_NAME} from "../url";

export interface Dress {
    id: number;
    description: string;
    availableFrom: Date;
    pictures: DressPicture[];
    price: number;
};

export interface DressPicture {
    url: string;
    main?: boolean;
}

export const getDresses = async (dateFrom: string, dateTo: string, dressType: string, priceRange: number[]): Promise<AxiosResponse<Dress[]>> => {
    const parameters = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        dressType: dressType,
        priceRange: priceRange
    }
    return await axios.get(`${API_HOST_NAME}/dresses`, {params: parameters});
};

export const getDressById = async (dressId: number): Promise<AxiosResponse<Dress>> => {
    return await axios.get(`${API_HOST_NAME}/dresses/${dressId}`);
};