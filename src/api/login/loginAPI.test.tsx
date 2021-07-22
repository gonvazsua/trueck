import {LoginResponse, signInWithEmailAndPassword} from "./loginAPI";
import axios, {AxiosResponse} from "axios";

jest.mock('axios');

describe('Login API test', () => {

    const mockLoginResponse: LoginResponse = {
        token: 'mockToken'
    };

    test('should resolve promise login when user and password is valid', async () => {

        const testEmail = 'test@test.com';
        const pass = 'test';

        (axios.post as jest.Mock).mockReturnValue(mockLoginResponse);

        const loginResponse = await signInWithEmailAndPassword(testEmail, pass)
        expect(loginResponse).toEqual(mockLoginResponse);

    });

    test('should exists function signInWithEmailAndPassword', () => {
        expect(signInWithEmailAndPassword).not.toBeUndefined();
    });

});