import React from 'react'
import {Grid, Typography, Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const VideoPlayer = () => {
    const classes=useStyles();

  return (
    <Grid container className={classes.gridContainer}>
        <Paper className={classes.paper}> {/*Our own video*/}
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Name</Typography>
                <video playsInline muted ref={null} autoPlay className={classes.video} />
            </Grid>
        </Paper>
        {/*others video*/}
        <Paper className={classes.paper}> {/*Our own video*/}
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Name</Typography>
                <video playsInline ref={null} autoPlay className={classes.video} />
            </Grid>
        </Paper>
    </Grid>
  )
}

export default VideoPlayer