const {atom} = require("recoil");

export const userAtom = atom({
    key: 'userState',
    default: {
        isLogged: false,
    },
});