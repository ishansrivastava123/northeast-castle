import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import './Styling.css';
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
    castleCardHeader: {
        backgroundColor: 'PaleGoldenRod',
        textAlign: 'left',
    },
    castleCardActions: {
        backgroundColor: 'PaleGoldenRod',
        display: 'inline',
        textAlign: 'center',
        fontFamily: 'Permanent Marker',
        fontSize: '3.5vmin',
        marginRight: '0.5vw'
    },
}));

export default function MediaCard(props) {
    const classes = useStyles();
    return (
        <Card sx={{ width: '100%', marginTop: '4vh' }}>
            <CardHeader className={classes.castleCardHeader} title={props.title} titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
            <CardMedia
                component="img"
                sx={{ height: '40vh', objectFit: 'fill' }}
                image={props.image}
                alt="alnwick"
            />
            <CardContent className={classes.castleCardHeader}>
                <Typography variant="body2" color="text.dark">
                    {props.description}
                </Typography>
                <div  className={classes.castleCardActions}>
                    <Link to={props.url}>
                        learn more
                    </Link>
                </div>
            </CardContent>


        </Card>
    );
}
