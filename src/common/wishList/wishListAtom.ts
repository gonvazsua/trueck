import {atom} from "recoil";
import {Dress} from "../../api/dress/dressAPI";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const wishListAtom = atom<Dress[]>({
    key: 'wishListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});