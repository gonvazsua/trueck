import {signInWithEmailAndPassword } from "./loginAPI";

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

    test('should exists function signInWithEmailAndPassword', () => {
        expect(signInWithEmailAndPassword).not.toBeUndefined();
    });

});