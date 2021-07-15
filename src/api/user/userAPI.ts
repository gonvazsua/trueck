import {User} from "../../common/user/userAtom";
import {doFetch} from "../doFetch";
import {API_HOST_NAME} from "../url";


export const getLoggedUser = (): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        doFetch(`${API_HOST_NAME}/loggedUser`)
            .then((response: Response) => {
                if(!response.ok) {
                    reject('');
                }
                resolve(response.json());
            });
    });
}