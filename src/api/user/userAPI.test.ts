import {User} from "../../common/user/userAtom";
import {getLoggedUser} from "./userAPI";
import axios from "axios";
import {API_HOST_NAME} from "../url";

jest.mock('axios');
describe('userAPI', () => {

    const mockUser: User = {
        id: 1,
        name: 'Test'
    };

    test('should call to API to load user information', async () => {

        (axios.get as jest.Mock).mockReturnValue(mockUser);

        const user = await getLoggedUser();

        expect(axios.get).toBeCalledWith(`${API_HOST_NAME}/loggedUser`);
        expect(user).toEqual(mockUser);

    });

});