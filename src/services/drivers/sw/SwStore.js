import {action, observable} from 'mobx'
import {XmlMethodCall} from 'xmlmc'

class SwStore {
    @observable
    state = {
        ready: false,
    };

    @observable
    xmlmc;

    @action
    set_ready_state(state = true) {
        this.state.ready = state
    }

    constructor(server, port=5015) {
        const protocol = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
        const protocolProvided = protocol.test(server);
        this.xmlmc = protocolProvided ? new XmlMethodCall(server) : new XmlMethodCall(server, port);
    }

}

export default new SwStore('http://richs-macbook-air.local');