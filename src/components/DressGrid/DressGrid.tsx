import React from 'react';
import {Dress} from "../../api/dress/dressAPI";
import Grid from "@material-ui/core/Grid";
import DressForGrid from "../DressForGrid/DressForGrid";

export interface DressGridProps {
    dressList: Dress[];
};

const DressGrid = (props: DressGridProps): JSX.Element => {

    const { dressList } = props;

    return (
        <Grid container spacing={3}>
            {
                dressList.map(dress => (
                    <Grid item xs={12} xl={4} md={4} key={dress.id}>
                        <DressForGrid dress={dress} />
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default DressGrid;