import React from 'react';
import Grid from 'material-ui/Grid'
import {observer} from 'mobx-react'

const Dashboard = props => (

    <Grid className={props.classes.root} container>
        {props.children}
    </Grid>
);

export default observer(Dashboard)
