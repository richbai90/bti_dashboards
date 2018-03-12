import {action, extendObservable, observable} from 'mobx';
import pubsub from 'pubsub-js'

export default class ChartStore {

    constructor(state, loader) {
        this.state = state;
        this.loader = loader
    }

    @action
    async loadChartData(chartId) {
        let config = await this.loader.getChartConfig(chartId);
        config.data = await config.data;

        const dashboards = this.state.modules.Dashboard.activeChartConfigs;

        for(let key of Object.keys(config)) {
            dashboards[chartId][key] = config[key]
        }

        dashboards[chartId].initialized = true;


    }
}
