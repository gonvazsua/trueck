const {atom} = require("recoil");

export const userAtom = atom({
    key: 'userState',
    default: {
        isLogged: false,
        displayName: null,
        email: null,
        photoURL: null,
        createdAt: null,
        uid: null
    },
});