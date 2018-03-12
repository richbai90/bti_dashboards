import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withStyles} from 'material-ui/styles'

import AppDrawer from "./AppDrawer";
import AppDrawerStore from './store/index';

@inject('state') @inject('loader') @observer
export default class AppDrawerContainer extends Component {
    constructor(props) {
        super(props);
        this.appDrawerStore = new AppDrawerStore(props.state);
    }

    style(component) {
        return withStyles(this.appDrawerStore.style)(component);
    }

    render() {
        const StyledAppDrawer = this.style(AppDrawer);
        return <StyledAppDrawer dashboards={this.appDrawerStore.dashboards} />
    }
}

