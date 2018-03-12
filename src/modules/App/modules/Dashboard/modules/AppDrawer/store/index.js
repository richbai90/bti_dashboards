import {computed} from 'mobx';
import tinycolor from 'tinycolor2';


export default class AppDrawerStore {
    constructor(state) {
        this.state = state;
    }

    @computed
    get style() {
        const theme = this.state.theme;
        const textColor = theme.dark ? theme.variables.white : theme.variables.black;
        return {
            drawerPaper: {
                width: '25vh',
            },

            textColor: {color: tinycolor(textColor).setAlpha(.87).toRgbString()},
            svgColor: {color: tinycolor(textColor).setAlpha(.57).toRgbString()},
            activeButton: {backgroundColor: 'rgba(0, 0, 0, .08)'},
            activeTextColor: {color: tinycolor(theme.definition.palette.primary.main).setAlpha(.87).toRgbString()},
            activeSvgColor: {color: tinycolor(theme.definition.palette.primary.main).setAlpha(.57).toRgbString()},
        };

    }

    @computed
    get dashboards() {
        return Object.keys(this.state.modules.Dashboard.dashboards).map((id) => {
            return this.state.modules.Dashboard.dashboards[id]
        });
    }
}