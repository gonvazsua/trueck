import {atom} from "recoil";
import {ShoppingCartDress} from "../../api/dress/dressAPI";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const shoppingCartAtom = atom<ShoppingCartDress[]>({
    key: 'shoppingCartState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});