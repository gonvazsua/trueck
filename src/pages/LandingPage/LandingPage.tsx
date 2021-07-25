import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import SearchDressForm from "../../components/SearchDressForm/SearchDressForm";
import DressGrid from "../../components/DressGrid/DressGrid";
import {Dress, getDresses} from "../../api/dress/dressAPI";
import Typography from "@material-ui/core/Typography";
import {AxiosResponse} from "axios";

const LandingPage = (): JSX.Element => {

    const [dressList, setDressList] = useState(new Array<Dress>());

    // const mockDressList: Dress[] = [
    //     {id: 1, availableFrom: new Date(), description: 'Amazona maxi vestido estampado selva con cinturon', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg', price: 152},
    //     {id: 2, availableFrom: new Date(), description: 'Florisa vestido largo vaporoso halter', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-141-min-scaled.jpg', price: 147},
    //     {id: 3, availableFrom: new Date(), description: 'Daleside vestido midi beige frunce cintura', picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-94.jpg', price: 87},
    //     {id: 4, availableFrom: new Date(), description: 'Vestido tirantes midi rojo', picture: 'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg', price: 108}
    // ];

    const searchDresses = async (dateFrom: string, dateTo: string, dressType: string, priceRange: number[]) => {
        const dressListResponse: AxiosResponse<Dress[]> = await getDresses(dateFrom, dateTo, dressType, priceRange);
        if(dressListResponse.data) {
            setDressList(dressListResponse.data);
        }
    };

    return (
        <div data-testid='landingPage'>
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <SearchDressForm searchFunction={searchDresses} />
                </Grid>
                {dressList && (
                    <Grid item lg={12}>
                        <DressGrid dressList={dressList} />
                    </Grid>
                )}
                {(!dressList || dressList.length === 0) && (
                    <Grid item lg={12}>
                        <Typography data-testid={'SearchDressForm-noResults'} align={'center'} variant={'h6'}>
                            No se han encontrado looks para la búsqueda seleccionada
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );

};

export default LandingPage;