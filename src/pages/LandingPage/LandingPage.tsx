import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import SearchDressForm from "../../components/SearchDressForm/SearchDressForm";
import DressGrid from "../../components/DressGrid/DressGrid";
import {Dress, getDresses} from "../../api/dress/dressAPI";
import Typography from "@material-ui/core/Typography";
import {AxiosResponse} from "axios";

const LandingPage = (): JSX.Element => {

    const [dressList, setDressList] = useState(new Array<Dress>());

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