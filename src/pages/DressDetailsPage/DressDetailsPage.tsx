import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import DressPicturesGallery from "../../components/DressPicturesGallery/DressPicturesGallery";
import {useParams} from 'react-router-dom';
import {useRecoilState} from "recoil";
import {dressDetailsAtom} from "./DressDetailsAtom";
import {getDressById} from "../../api/dress/dressAPI";
import Typography from "@material-ui/core/Typography";
import DressDetails from "../../components/DressDetails/DressDetails";

const DressDetailsPage = (): JSX.Element => {

    const { dressId } = useParams<{ dressId: string }>();
    const [dress, setDress] = useRecoilState(dressDetailsAtom);

    useEffect(() => {

        const fetchDress = async () => {
            try {
                const dressResponse = await getDressById(parseInt(dressId))
                if(dressResponse.data) {
                    setDress(dressResponse.data);
                }
            } catch (e) {
                setDress(null);
            }
        }

        fetchDress();

    }, [dressId]);

    const renderDressDetails = (): JSX.Element => {
        return (
            <Grid container spacing={10} data-testid={'DressDetailsPage-dressDetails'}>
                <Grid item lg={6}>
                    <DressPicturesGallery dressPictures={dress?.pictures}/>
                </Grid>
                <Grid item lg={6}>
                    {dress &&
                        <DressDetails dress={dress}/>
                    }
                </Grid>
            </Grid>
        );
    };



    const renderErrorLoadingDressDetails = (): JSX.Element => {
        return (
            <Grid container spacing={3} data-testid={'DressDetailsPage-noDressError'}>
                <Grid item lg={12}>
                    <Typography>
                        Ups! Parece que el look que estabas buscando ya no está disponible
                    </Typography>
                </Grid>
            </Grid>
        );
    };

    return (
        <div data-testid={'DressDetailsPage-root'}>
            {dress
                ? renderDressDetails()
                : renderErrorLoadingDressDetails()
            }
        </div>
    );
};

export default DressDetailsPage;