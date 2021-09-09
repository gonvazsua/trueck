import axios, {AxiosResponse} from "axios";
import {Dress, getDresses} from "./dressAPI";
import moment from "moment";
import {API_HOST_NAME} from "../url";

jest.mock('axios');
describe('Dress API Test', () => {

    const mockDressList = [
        {
            id: 1,
            availableFrom: new Date(),
            description: 'Amazona maxi vestido estampado selva con cinturon',
            shortDescription: 'Amazona maxi vestido',
            pictures: [
                {
                    main: true,
                    url: 'test'
                }
            ],
            price: 152,
            originalPrice: 100,
            username: 'username',
            tags: ['test'],
            size: 'M',
            blockingDates: [new Date()]
        },
    ]

    test('should call to dress API', async () => {

        const axiosResponse: AxiosResponse<Dress[]> = {
            data: mockDressList,
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
        };
        (axios.get as jest.Mock).mockReturnValue(Promise.resolve(axiosResponse));
        const date = moment().format('DD/MM/YYYY');
        const dressType = 'Dress type test';
        const priceRange = [0,200];

        const dressListResponse: AxiosResponse<Dress[]> = await getDresses(date, date, dressType, priceRange);

        const params = {
            dateFrom: date,
            dateTo: date,
            dressType: dressType,
            priceRange: priceRange
        }
        expect(axios.get).toBeCalledWith(`${API_HOST_NAME}/dresses`, {params});
        expect(dressListResponse.data).toEqual(mockDressList);

    });

});