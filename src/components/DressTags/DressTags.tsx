import React from 'react';
import {Chip, makeStyles} from "@material-ui/core";

export interface DressTagsProps {
    tags: string[];
};

const DressTags = (props: DressTagsProps): JSX.Element => {

    const { tags } = props;
    const classes = useStyles();

    return (
        <div>
        {
            tags.map(tag => (
                <Chip label={tag} color={'secondary'} className={classes.tag} key={tag}/>
            ))
        }
        </div>
    )
};

export default DressTags;

const useStyles = makeStyles((theme) => ({
    tag: {
        marginRight: '0.5rem',
        marginTop: '1rem',
        textTransform: 'uppercase'
    },
}));