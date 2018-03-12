import React from 'react';
import {observer} from 'mobx-react'

import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import HomeIcon from 'material-ui-icons/Home'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import ThemePicker from './modules/ThemePicker'

const AppDrawer = observer(props => (
    <Drawer elevation={32} variant="permanent" classes={{paper: props.classes.drawerPaper}} open={true}>
        <div>
            <ListItem button classes={{root: props.classes.activeButton}}>
                <ListItemIcon classes={{root: props.classes.activeSvgColor}}>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: props.classes.activeTextColor}} primary="Default"/>
            </ListItem>
            <Divider/>
        </div>
        {props.dashboards.map((dashboard) => (<div key={dashboard.id}><ListItem button>
            <ListItemText classes={{primary: props.classes.textColor}} primary={dashboard.text} />
        </ListItem><Divider/></div>))}
        <div>
            <ListItem>
                <ThemePicker />
            </ListItem>
            <Divider/>
        </div>
    </Drawer>
));

export default AppDrawer
