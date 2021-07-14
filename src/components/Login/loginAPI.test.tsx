import {signInWithGoogle} from "./loginAPI.tsx";

jest.mock('firebase/app', () => {
    const auth = jest.fn();
    const mAuth = { signInWithPopup: jest.fn() };
    auth.GoogleAuthProvider = jest.fn();
    auth.Auth = jest.fn(() => mAuth);
    return { auth };
});

describe('Login API test', () => {

    // test('should get user data when sign in with Google', () => {
    //
    //     firebase.auth.mockImplementation(() => new firebase.auth.GoogleAuthProvider());
    //
    //     const user = signInWithGoogle();
    //
    //     expect(user).not.toBeUndefined();
    //
    // });

    test('should exists function signInWithGoogle', () => {
        expect(signInWithGoogle).not.toBeUndefined();
    });

});