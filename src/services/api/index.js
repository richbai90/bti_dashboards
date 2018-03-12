export class DataLoader {
    constructor(driver) {
        this.driver = driver;
    }

    async getChartConfig(id) {
        // todo actually get this chart data from our storage database. For now its mocked with a switch statement
        let a = await this.driver.query("select count(callref) as y, callclass as chart, date_format(from_unixtime(logdatex), '%Y') as x from opencall WHERE callclass in ('incident', 'service request') group by x, chart order by x, chart asc");
        let b = await this.driver.query('select count(callref) as y, callclass as x from opencall group by callclass');

        if(a.status === 'ok') {
            let mapped = this.mapData(a.data);
            a.data = mapped[1];
            a.charts = mapped[0];
        } else {
            a.charts = []
        }

        if(b.status === 'ok') {
            let mapped = this.mapData(b.data);
            b.data = mapped[1];
            b.charts = mapped[0];
        } else {
            b.charts = []
        }

        switch (id) {
            case 'a':
                return {
                    charts: a.charts,
                    data:a.data,
                    type: 'line',
                    multi: true,
                    multiType: 'stacked',
                    colors: {},
                    tooltip: true,
                };
            case 'b':
                return {
                    charts: b.charts,
                    data: b.data,
                    type: 'bar',
                    multi: false,
                    multiType: 'stacked',
                    colors: {},
                    tooltip: true,
                };
        }
    }

    async getDashboards() {
        // todo actually get this dashboard data from our storage database. For now its mocked
        return {
            a: {text: 'Service Desk', id: 'a', charts: ['a', 'b']},
            b: {text: 'Change Management', id: 'b'},
            c: {text: 'Survey', id: 'c'},
            d: {text: 'ASD', id: 'd'},
            e: {text: 'GTI', id: 'e'},
        }

    }

    mapData(data) {
        let charts = [];

        function _mapData(d) {
            let x = '';
            let set = {};
            return d.reduce(function (finalVal, currentVal, currentIndex) {
                if (x !== currentVal.x && x !== parseInt(currentVal.x)) {
                    if (currentIndex) finalVal.push(set);
                    let intX = parseInt(currentVal.x);
                    set = intX ? {x: intX} : {x: currentVal.x};
                    x = intX || currentVal.x;
                }

                if(currentVal.chart) {
                    currentVal.chart = currentVal.chart.toLowerCase();
                } else {
                    currentVal.chart = 'y'
                }

                set[currentVal.chart] = parseInt(currentVal.y);

                if (charts.indexOf(currentVal.chart.toLowerCase()) === -1) {
                    charts.push(currentVal.chart.toLowerCase())
                }
                return finalVal
            }, [])
        }

        return [charts, _mapData(data)]
    }
}

export class Session {
    constructor(driver) {
        this.driver = driver;
    }

    logon(username, password) {
        return this.driver.logon(username, password);

    }
}
