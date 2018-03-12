import React, {Component} from 'react';
import Chart from './modules/Chart'
import Dashboard from './Dashboard'
import Store from './store'
import AppDrawer from './modules/AppDrawer'
import {observer, inject} from 'mobx-react'
import {withStyles} from 'material-ui'

@inject('state') @inject('loader') @observer
export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.store = new Store(this.props.state);
    }
    componentWillMount() {
        this.store.initialize(this.props.loader);
        this.StyledDashboard = this.style(Dashboard);
        this.props.state.theme.store.updateTheme('#67e2ff') // default color
    }

    style(component) {
        return withStyles({
            root: {
                paddingLeft: '33vh',
                paddingRight: '8vh',
                paddingTop: '2vh',
                paddingBottom: '2vh'
            }
        })(component);
    }
    render() {
        const charts = this.store.dashboards;
        const StyledDashboard = this.StyledDashboard;
        return (
            <StyledDashboard>
                <AppDrawer/>
                {this.store.charts.map(chartId => <Chart chartId={chartId} />)}
            </StyledDashboard>
        )
    }
}
