import {rest} from 'msw';
import {API_HOST_NAME} from "../api/url";
import {User} from "../common/user/userAtom";
import {Dress} from "../api/dress/dressAPI";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

const dressList: Dress[] = [
    {id: 1, availableFrom: new Date(), description: 'Amazona maxi vestido estampado selva con cinturon', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg', price: 152},
    {id: 2, availableFrom: new Date(), description: 'Florisa vestido largo vaporoso halter', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-141-min-scaled.jpg', price: 147},
    {id: 3, availableFrom: new Date(), description: 'Daleside vestido midi beige frunce cintura', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-94.jpg', price: 87},
    {id: 4, availableFrom: new Date(), description: 'Vestido tirantes midi rojo', picture: 'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg', price: 108}
];

export const handlers = [

    rest.post<LoginRequest, LoginResponse>(`${API_HOST_NAME}/login`, (req, res, ctx) => {
        const { email, password } = req.body;
        if (email === 'test@test.com' && password === 'test') {
            return res(
                ctx.json({token: 'mockToken'}),
                ctx.status(200),
            )
        }
        return res(
            ctx.status(403),
        )

    }),

    rest.get<Request, User>(`${API_HOST_NAME}/loggedUser`, (req, res, ctx) => {
        return res(
            ctx.json({id: 7, name: 'UsuarioTest'}),
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