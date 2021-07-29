import {Dress} from "../../api/dress/dressAPI";
import {atom} from "recoil";

export const dressDetailsAtom = atom<Dress | null>({
    key: 'dressDetailsState',
    default: null,
});