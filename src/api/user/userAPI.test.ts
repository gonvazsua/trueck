import {User} from "../../common/user/userAtom";
import {doFetch} from "../doFetch";
import {getLoggedUser} from "./userAPI";

jest.mock('../doFetch');
describe('userAPI', () => {

    test('should call to API to load user information', () => {

        const mockUser: User = {
            id: 1,
            name: 'Test'
        };
        const url = 'http://localhost:8080/loggedUser';

        (doFetch as jest.Mock).mockImplementation(() => {
            return new Promise<User>((resolve) => {
                resolve(mockUser);
            })
        });

        getLoggedUser().then((user: User) => {
            expect(user).toEqual(mockUser);
        });

        expect(doFetch).toBeCalledWith(url);

    });

});