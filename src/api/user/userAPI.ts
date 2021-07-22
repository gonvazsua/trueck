import {User} from "../../common/user/userAtom";
import {API_HOST_NAME} from "../url";
import axios, {AxiosResponse} from "axios";


export const getLoggedUser = async (): Promise<AxiosResponse<User>> => {
    return await axios.get<User>(`${API_HOST_NAME}/loggedUser`);
}