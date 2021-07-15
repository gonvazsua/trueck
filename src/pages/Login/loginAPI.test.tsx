import {LoginResponse, signInWithEmailAndPassword} from "./loginAPI";
import {doFetch} from "../../api/doFetch";

jest.mock('../../api/doFetch');

describe('Login API test', () => {

    test('should resolve promise login when user and password is valid', async () => {

        const mockLoginResponse: LoginResponse = {
            token: 'mockToken'
        };
        const testEmail = 'test@test.com';
        const pass = 'test';
        const url = 'http://localhost:8080/login';
        const testBody = {
            email: testEmail,
            password: pass
        };

        (doFetch as jest.Mock).mockImplementation(() => {
           return new Promise<LoginResponse>((resolve) => {
               resolve(mockLoginResponse);
           })
        });

        signInWithEmailAndPassword(testEmail, pass)
            .then((loginResponse: LoginResponse) => {
                expect(loginResponse).toEqual(mockLoginResponse);
            });

        expect(doFetch).toBeCalledWith(url, { method: 'POST', body: JSON.stringify(testBody) });

    });

    test('should exists function signInWithEmailAndPassword', () => {
        expect(signInWithEmailAndPassword).not.toBeUndefined();
    });

});