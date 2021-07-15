import {rest} from 'msw';
import {API_HOST_NAME} from "../api/url";
import {User} from "../common/user/userAtom";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

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
]