import {action, computed} from 'mobx';

export default class LoginStore {

    constructor(state) {
        this.state = state;
    }

    @computed
    get username() {
        console.log(this.state);
        return this.state.modules.Login.username;
    }

    @computed
    get password() {
        return this.state.modules.Login.password;
    }

    @action
    update(name) {
        const self = this;
        return (event) => {
            console.log(self);
            self.state.modules.Login[name] = event.target.value;
        }
    }

    @action
    login() {
        this.state.session.initialized = true;
    }

    @action
    async initialize(loader, session, sessid) {
        const sessionInfo = sessid ? await session.logon(sessid) : await session.logon(this.username, this.password);
        this.state.session.id = sessionInfo.sessionId;
        this.state.session.initialized = true;
    }
}