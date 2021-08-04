import {atom} from "recoil";
import {Dress} from "../../api/dress/dressAPI";

export const wishListAtom = atom<Dress[]>({
    key: 'wishListState',
    default: [],
});