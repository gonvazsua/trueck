import firebase from "firebase/app";

export const signInWithUsernameAndPassword = (username, password) => {

};

export const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    console.log(googleAuthProvider);
    console.log(firebase.auth())
    return firebase.auth().signInWithPopup(googleAuthProvider);
};