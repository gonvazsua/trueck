import firebase from "firebase/app";

export const signInWithEmailAndPassword = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return await firebase.auth().signInWithPopup(googleAuthProvider);
};