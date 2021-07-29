import {rest} from 'msw';
import {API_HOST_NAME} from "../api/url";
import {User} from "../common/user/userAtom";
import {Dress} from "../api/dress/dressAPI";
import {UserResponse} from "../api/user/userAPI";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

const dressList: Dress[] = [
    {id: 1, availableFrom: new Date(), description: 'Amazona maxi vestido estampado selva con cinturon', pictures: [{url: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg', main:true}], price: 152},
    {id: 2, availableFrom: new Date(), description: 'Florisa vestido largo vaporoso halter', pictures: [{url:'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-141-min-scaled.jpg', main:true}], price: 147},
    {id: 3, availableFrom: new Date(), description: 'Daleside vestido midi beige frunce cintura', pictures: [{url:'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-94.jpg', main:true}], price: 87},
    {id: 4, availableFrom: new Date(), description: 'Vestido tirantes midi rojo', pictures: [{url:'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg', main:true}], price: 108}
];

const users: User[] = [
    {id: 1, fullName: 'Juan', username: 'juan', email: 'juan@gmail.com'},
    {id: 1, fullName: 'Antonio', username: 'atonito', email: 'antonio@gmail.com'},
    {id: 1, fullName: 'Francisco', username: 'paquito', email: 'paco@gmail.com'}
];

export const handlers = [

    rest.post<LoginRequest, LoginResponse>(`${API_HOST_NAME}/login`, (req, res, ctx) => {
        const { email } = req.body;
        const foundUsers = users.filter(u => u.email === email);
        if (foundUsers.length > 0) {
            return res(
                ctx.json({token: 'mockToken'}),
                ctx.status(200),
            )
        }
        return res(
            ctx.status(403),
        )

    }),

    rest.post<Request, Response>(`${API_HOST_NAME}/signUp`, (req, res, ctx) => {
        return res(
            ctx.status(200),
        )
    }),

    rest.get<Request, User>(`${API_HOST_NAME}/loggedUser`, (req, res, ctx) => {
        return res(
            ctx.json(users[0]),
            ctx.status(200),
        )
    }),

    rest.get<Request, UserResponse>(`${API_HOST_NAME}/users`, (req, res, ctx) => {
        const username = req.url.searchParams.get('username');
        const userListResponse = users.filter(u => u.username === username);
        console.log(userListResponse, username)
        const userResponse: UserResponse = {
            users: userListResponse
        };
        return res(
            ctx.json(userResponse),
            ctx.status(200),
        )
    }),

    rest.get<Request, Dress[]>(`${API_HOST_NAME}/dresses`, (req, res, ctx) => {
        return res(
            ctx.json(dressList),
            ctx.status(200),
        )
    }),
]