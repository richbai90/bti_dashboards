import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import stateStore from '__common__/store'
import {DataLoader, Session} from './services/api'
import SwSql from './services/drivers/sw/SwSqlDriver'
import SwSession from './services/drivers/sw/SwSessionDriver'

import App from 'App';
import './index.css'

const swSql = new SwSql();
const swSession = new SwSession();

const context = {
    state: stateStore.state,
    globalStore: stateStore,
    loader: new DataLoader(swSql),
    session: new Session(swSession),
};


window.state = stateStore.state;


/**
 * The Provider component allows us to inject the stores wherever they are required. This makes it easy to get
 * to the uiStore from anywhere in the application. We simply need to inject it using @inject("uiStore"). Then
 * uiStore is available on this.props.
 */

ReactDOM.render(
    <Provider {...context}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
