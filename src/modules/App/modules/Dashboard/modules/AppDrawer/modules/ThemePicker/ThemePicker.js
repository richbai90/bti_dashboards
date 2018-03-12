import React from 'react';
import {observer} from 'mobx-react'
import GridList, {GridListTile} from 'material-ui/GridList'

const ThemePicker = props => (
    <GridList>
        <GridListTile rows={.1}>
            <div role="button" style={{width: 20, height: 20, backgroundColor: '#F44336'}} onClick={props.updateTheme("#F44336")}>
                &nbsp;
            </div>
        </GridListTile>
        <GridListTile rows={.1}>
            <div role="button" style={{width: 20, height: 20, backgroundColor: '#3F51B5'}} onClick={props.updateTheme("#3F51B5")}>
                &nbsp;
            </div>
        </GridListTile>
        <GridListTile rows={.1}>
            <div role="button" style={{width: 20, height: 20, backgroundColor: '#FFEB3B'}} onClick={props.updateTheme("#FFEB3B")}>
                &nbsp;
            </div>
        </GridListTile>
        <GridListTile rows={.1}>
            <div role="button" style={{width: 20, height: 20, backgroundColor: '#67e2ff'}} onClick={props.updateTheme("#67e2ff")}>
                &nbsp;
            </div>
        </GridListTile>
    </GridList>
);

export default observer(ThemePicker);