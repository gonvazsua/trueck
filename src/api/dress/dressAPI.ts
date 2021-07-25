import {AxiosResponse} from "axios";

export interface Dress {
    id: number;
    description: string;
    availableFrom: Date;
    picture: string;
    price: number;
};

export const getDresses = (dateFrom: string, dateTo: string, dressType: string, priceRange: number[]): AxiosResponse<Dress[]> => {
    return {
        data: new Array<Dress>(),
        config: {},
        status: 200,
        statusText: '',
        headers: []
    };
};