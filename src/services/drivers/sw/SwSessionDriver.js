import store from './SwStore'

export default class SwSessionDriver {
    async logon(user, password) {
        const pwd64 = btoa(password);
        const sessid = await (() => {
            if (password) {
                return store.xmlmc.session.analystLogon(user, pwd64).then(
                    (response) => {
                        store.state.ready = true;
                        return response.params.sessionid
                    }
                )

            } else {
                return store.xmlmc.session.bindSession(user).then(
                    (response) => {
                        store.state.ready = true;
                        return response.params.sessionid
                    }
                );
            }
        })();

        store.set_ready_state();
        return this.getSessionInfo(sessid)
    }

    getSessionInfo() {

        return store.xmlmc.session.getSessionInfo2().then(response => {
            return response.params
        });
    }
}