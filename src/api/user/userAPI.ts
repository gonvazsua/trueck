import {User} from "../../common/user/userAtom";


export const getLoggedUser = (): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        reject('Not implemented');
    });
}