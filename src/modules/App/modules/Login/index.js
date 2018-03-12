import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withStyles} from 'material-ui'

import LoginStore from './store'

import Login from './Login'


@inject('state') @inject('session') @inject('loader') @observer
export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.store = new LoginStore(props.state);
    }

    style(component) {
        return withStyles({
            login: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '50%',
                justifyContent: 'center',
            },

            loginWrapper: {
                display: 'flex',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
            }
        })(component);
    }

    componentWillMount() {
        this.StyledLogin = this.style(Login);
        const sessid = sessionStorage.getItem('sessionId');
        if(sessid) this.store.initialize(this.props.loader, this.props.session, sessid)
    }

    render() {
        const StyledLogin = this.StyledLogin;
        return (
            <StyledLogin username={this.store.username} password={this.store.password}
                         onChange={this.store.update.bind(this.store)} onSubmit={this.submitLogin.bind(this)}/>
        )
    }

    async submitLogin() {
        const self = this;
        this.store.initialize(this.props.loader, this.props.session) // This is where we initialize the app
    }
}