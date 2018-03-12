import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {MuiThemeProvider, withStyles} from "material-ui/styles"

import App from './App';
import AppStore from './store'
import Login from "./modules/Login";

import Loading from "Loading";

/**
 * The AppContainer handles all of the logical functionality that has to happen at the root level.
 * A prime example is the MuiThemeProvider, that must be the parent of all other rendered components.
 * To change the muiTheme we use the AppContainer to render the MuiThemeProvider
 */
@inject('state') @inject('globalStore') @observer
export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.appStore = new AppStore(props.state);
    }

    style(component) {
        return withStyles(this.appStore.style)(component);
    }

    componentCleanup() {
        sessionStorage.setItem('sessionId', this.props.state.session.id);
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.addEventListener('beforeunload',this.componentCleanup.bind(this));
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup.bind(this));
    }

    render() {
        const StyledApp = this.style(App);
        return (
            <MuiThemeProvider theme={this.props.state.theme.muiTheme}>
                {
                    this.appStore.loggedIn ? (
                        this.appStore.initialized ?
                            <StyledApp/> :
                            <div className="backgroundWrapper" style={this.appStore.style.app}>
                                <Loading size={10}/>
                            </div>
                    ) : (
                        <div className="backgroundWrapper" style={this.appStore.style.app}>
                            <Login/>
                        </div>
                    )
                }
            </MuiThemeProvider>
        )
    }
}
