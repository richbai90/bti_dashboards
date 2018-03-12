import React, {Component} from 'react'
import {toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import store from './store'
import * as recharts from 'recharts'
import Loading from 'Loading';
import Chart from "./Chart";
import {withStyles} from "material-ui";

@inject('loader') @inject('state') @observer
export default class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.store = new store(props.state, props.loader)
    }

    componentWillMount() {
        console.log(this.props.chartId);
        this.store.loadChartData(this.props.chartId);
        this.StyledChart = this.style(Chart)
    }

    style(component) {
        return withStyles({
            paper: {
                minWidth: 300,
                minHeight: 150,
            }
        })(component);
    }

    renderRechartComponent(config) {
        const chartType = config.type;
        if (typeof config.data === 'string') {
            return (<div>config.data.data</div>)
        }

        const data = toJS(config.data);

        switch (chartType) {
            case 'bar':
                return this.renderBarChart(config, data);
            case 'line':
                return this.renderLineChart(config, data);
            case 'pie':
                break;
            case 'donut':
                break;
            case 'area':
                break;
            case 'radial':
                break;
            case 'composed':
                break;
            default:
                break;
        }
    }

    renderBarChart(config, data) {
        const BarChart = recharts.BarChart;
        const Bar = recharts.Bar;
        const XAxis = recharts.XAxis;
        const YAxis = recharts.YAxis;
        const CartesianGrid = recharts.CartesianGrid;
        const Tooltip = recharts.Tooltip;
        const Legend = recharts.Legend;
        const bars = [];

        for (let i = 0; i < config.charts.length; i++) {
            let dataKey = config.charts[i];
            // todo : Theme this
            let bar = (
                <Bar dataKey={dataKey} fill={this.props.state.theme.variables.chartColorSchemes.categorical[i]}/>
            );

            bars.push(bar);
        }

        return (
            <BarChart data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="x"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                {bars}
            </BarChart>
        )
    }


    renderLineChart(config, data) {
        const LineChart = recharts.LineChart;
        const Line = recharts.Line;
        const XAxis = recharts.XAxis;
        const YAxis = recharts.YAxis;
        const CartesianGrid = recharts.CartesianGrid;
        const Tooltip = recharts.Tooltip;
        const Legend = recharts.Legend;
        const lines = [];

        for (let i = 0; i < config.charts.length; i++) {
            let dataKey = config.charts[i];
            // todo : Theme this
            let line = (
                <Line dataKey={dataKey} stroke={this.props.state.theme.variables.chartColorSchemes.categorical[i]}/>
            );

            lines.push(line)
        }

        return (
            <LineChart data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="x"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                {lines}
            </LineChart>
        )
    }

    render() {
        const ResponsiveContainer = recharts.ResponsiveContainer;
        const chartConfig = this.props.state.modules.Dashboard.activeChartConfigs[this.props.chartId];
        const StyledChart = this.StyledChart;
        return (
            <StyledChart>
                <ResponsiveContainer width="100%" height={this.props.height || 300}>
                    {chartConfig.initialized ? this.renderRechartComponent(chartConfig) : <Loading/>}
                </ResponsiveContainer>
            </StyledChart>
        );
    }


}
