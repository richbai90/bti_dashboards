import React from 'react'
import {observer} from 'mobx-react'
import Grid from 'material-ui/Grid/Grid'
import Card from 'material-ui/Card'
const Chart = props => (
    <Grid item xs={props.size || true}>
        <Card>
            {props.children}
        </Card>
    </Grid>
);

export default observer(Chart)
