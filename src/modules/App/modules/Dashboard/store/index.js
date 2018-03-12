import {action, computed} from 'mobx';

export default class DashboardStore {

    constructor(state) {
        this.state = state;
    }

    @computed
    get dashboards() {
        return Object.keys(this.state.modules.Dashboard.dashboards);
    }

    @computed
    get charts() {
        return this.state.modules.Dashboard.activeCharts
    }

    @action
    selectDashboard(id) {
        this.state.modules.Dashboard.activeDashboard = id;
        this.state.modules.Dashboard.activeCharts = this.state.modules.Dashboard.dashboards[id].charts
    }


    @action
    async initialize(loader) {
        this.state.modules.Dashboard.dashboards = await loader.getDashboards();
        this.selectDashboard('a');
        this.state.modules.Dashboard.initialized = true;
    }
}
