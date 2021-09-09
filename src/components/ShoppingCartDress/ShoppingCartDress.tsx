import React from "react";
import {Dress} from "../../api/dress/dressAPI";

export interface ShoppingCartDressProps {
    dress: Dress;
};

const ShoppingCartDress = (props: ShoppingCartDressProps): JSX.Element => {

    const {dress} = props;

    return (<div>{dress.shortDescription}</div>)
};

export default ShoppingCartDress;