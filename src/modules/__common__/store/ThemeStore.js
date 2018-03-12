import {action, computed, observable} from 'mobx';
import {createMuiTheme} from "material-ui";
import tinycolor from 'tinycolor2';

class ThemeStore {
    @observable
    muiThemeDefinition = {
        palette: {
            primary: {
                main: '#67e2ff',
                light: '#a0ffff',
                dark: '#1eb0cc',
                contrastText: '#3b3f42'
            },

            secondary: {
                main: '#590ce8',
                light: '#9549ff',
                dark: '#0000b4',
                contrastText: '#fefefe'
            }
        }
    };

    @computed
    get darkTheme() {
        return tinycolor(this.muiThemeDefinition.palette.primary.main).isLight()
    }

    @observable
    themeVariables = {
        black: '#3b3f42',
        white: '#fefefe',
        paper: {
            dark: '#303437',
            light: '#fdfdfd'
        },

        grey: {
            light: '#ececec',
            dark: '#a5a5a5'
        },

        chartColorSchemes: {
            paired: [],
            progressive: [],
            categorical: []
        }
    };

    @computed
    get muiTheme() {
        return createMuiTheme(Object.assign({}, this.muiThemeDefinition, this.muiThemeOverrides));
    }

    @computed
    get backgroundColor() {
        return this.darkTheme ? this.themeVariables.black : this.themeVariables.white
    }

    @computed
    get muiThemeOverrides() {
        const self = this;
        return {
            overrides: {
                MuiPaper: {
                    root: {
                        backgroundColor: self.darkTheme ? self.themeVariables.paper.dark : self.themeVariables.paper.light,
                        color: self.darkTheme ? self.themeVariables.white : self.themeVariables.black,
                    }
                }
            }
        }
    }

    @action
    updateTheme(color) {
        const [primaryColor, secondaryColor] = this.computeScheme(color, 'splitcomplement');
        const primaryPalette = this.computePaletteColors(primaryColor);
        const secondaryPalette = this.computePaletteColors(secondaryColor);
        this.muiThemeDefinition.palette.primary.main = primaryPalette[0];
        this.muiThemeDefinition.palette.primary.light = primaryPalette[1];
        this.muiThemeDefinition.palette.primary.dark = primaryPalette[2];
        this.muiThemeDefinition.palette.primary.contrastText = tinycolor(primaryPalette[0]).isLight() ? this.themeVariables.black : this.themeVariables.white;
        this.muiThemeDefinition.palette.secondary.main = secondaryPalette[0];
        this.muiThemeDefinition.palette.secondary.light = secondaryPalette[1];
        this.muiThemeDefinition.palette.secondary.dark = secondaryPalette[2];
        this.muiThemeDefinition.palette.secondary.contrastText = tinycolor(secondaryPalette[0]).isLight() ? this.themeVariables.black : this.themeVariables.white;

        this.updateChartColors(secondaryPalette[0]);

    }

    @action
    updateChartColors(color) {
        // todo: Currently this only implements the categorical color scheme. We'll need to adjust that later.
        let newColor = color;

        let colors = [];
        let i = 0;
        while (i < 8) {

            let newTinyColor = tinycolor(newColor);

            if (this.darkTheme) {
                while (newTinyColor.isDark()) {
                    newTinyColor.lighten(.5);
                }
            } else {
                while (newTinyColor.isLight()) {
                    newTinyColor.darken(.5);
                }
            }

            colors.push(newColor);
            newColor = newTinyColor.splitcomplement()[1].toHexString();
            if(colors.indexOf(newColor) !== -1) {
                newColor = newTinyColor.spin(Math.floor(3.1415926 / 6 ) * 180).toHexString()
            }
            i++;
        }

        this.themeVariables.chartColorSchemes.categorical = colors;
    }

    computePaletteColors(color) {
        let main = tinycolor(color);
        let light = tinycolor(color).lighten(.5);
        let dark = tinycolor(color).darken(.5);

        return [main.toHexString(), light.toHexString(), dark.toHexString()]
    }

    computeScheme(primaryColor, type) {
        let colors = tinycolor(primaryColor)[type]();
        return [colors[0].toHexString(), colors[1].toHexString()];
    }
}

export default new ThemeStore();