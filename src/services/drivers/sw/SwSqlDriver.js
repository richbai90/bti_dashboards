// todo This ultimately will go on the server, we're putting it on the client now only as a POC

import store from './SwStore';
import {autorun} from 'mobx'

/**
 * The SwSqlDriver give the charts access to the dashboards via the supportworks API
 * It is asynchronous, and utilizes a pubsub system to send the data when it becomes available
 */
export default class SwSqlDriver {

    constructor() {
        this.store = store;
        autorun(() => {
            if (store.state.ready) {
                this.ready = true;
                this.processQueue();
            }
        })
    }

    ready = false;
    queue = [];


    query(sql, _id = '') {
        // todo this is dangerous! It must go on the server! Do not let this get into production code!
        let promise;
        let resolver;
        if (this.ready) {
            return store.xmlmc.data.sqlQuery('swdata', sql).then(response => ({data: response.data, status: 'ok'}))
                .catch( err => ({data: err, status: 'fail'}) )
        }
        else {
            promise = new Promise((resolve) => {
                resolver = resolve
            });
            this.queue.push(resolver);
        }


        return promise
    }

    processQueue() {
        console.log('working!');
        for (let q of this.queue) {
            q(async () => {
                    try {
                        return {data: await store.xmlmc.data.sqlQuery(), status: 'ok'}
                    } catch (e) {
                        return {data: e, status: 'fail'}
                    }
                }
            )
        }
    }


}