import {action} from 'mobx'

class ThemePickerStore {

    constructor(state) {
        this.state = state;
    }

    @action
    updateTheme(color) {
        this.state.theme.store.updateTheme(color);
    }
}

export default ThemePickerStore;