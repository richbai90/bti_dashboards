'use strict';

import {computed} from 'mobx';
import {createMuiTheme} from 'material-ui';
import tinycolor from 'tinycolor2';

export default class AppStore {
    constructor(state) {
        this.state = state;
    }

    @computed
    get style() {
        return {
            app: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: this.state.theme.backgroundColor,
                display: 'flex',
            }
        }
    }

    @computed
    get initialized() {
        return this.state.session.initialized;
    }

    @computed
    get loggedIn() {
        return this.state.session.id !== '';
    }

}
