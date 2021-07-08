const {atom} = require("recoil");

export const loginAtom = atom({
    key: 'loginState',
    default: {
        email: null,
        password: null,
    },
});