import ThemeStore from './ThemeStore'

import {observable} from "mobx";

class StateStore {

    // todo: A single observable state as a single store does not scale well.
    // Instead, make each section of the state its own store, with actions and observables.
    // Then make access to those stores available only through the state store.

    @observable
    state = {
        session: {
            id: '',
            user: '',
            rights: '',
            initialized: false,
        },
        theme: {
            store: ThemeStore,
            definition: ThemeStore.muiThemeDefinition,
            variables: ThemeStore.themeVariables,
            dark: ThemeStore.darkTheme,
            muiTheme: ThemeStore.muiTheme,
            backgroundColor: ThemeStore.backgroundColor,
        },
        modules: {
            Login: {
                username: '',
                password: '',
            },

            Dashboard: {
                dashboards: {},
                activeDashboard: 'Service Desk',
                activeCharts: [],
                activeChartConfigs: {
                    // todo: This is a hack. We need to break up this state object and use an observable map for the chart confs
                    a: {
                        charts: [],
                        data: {},
                        type: '',
                        multi: false,
                        multiType: '',
                        colors: {},
                        tooltip: true,
                        initialized: false,
                    },

                    b: {
                        charts: [],
                        data: {},
                        type: '',
                        multi: false,
                        multiType: '',
                        colors: {},
                        initialized: false,
                    }
                },
                initialized: false,
            }
        }
    };
}

export default new StateStore();