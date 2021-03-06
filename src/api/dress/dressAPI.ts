import axios, {AxiosResponse} from "axios";
import {API_HOST_NAME} from "../url";

export interface Dress {
    id: number;
    description: string;
    shortDescription: string;
    availableFrom: Date;
    pictures: DressPicture[];
    price: number;
    originalPrice: number;
    username: string;
    tags: string[];
    size: string;
    blockingDates: Date[];
};

export interface DressPicture {
    url: string;
    main?: boolean;
    name?: string;
}

export interface ShoppingCartDress {
    dress: Dress;
    date: Date;
}

export interface DressAvailabilityResponse {
    isAvailable: boolean;
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

export const checkAvailability = async (dressId: number, date: Date): Promise<AxiosResponse<DressAvailabilityResponse>> => {
    const isoDate = date.toISOString();
    return await axios.get(`${API_HOST_NAME}/dresses/${dressId}/availability/${isoDate}`);
};