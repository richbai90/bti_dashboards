import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import ThemePickerStore from "./store/index";
import ThemePicker from './ThemePicker'

@inject('state') @observer
export default class ThemePickerWrapper extends Component {
    constructor(props) {
        super(props);
        this.store = new ThemePickerStore(this.props.state);
    }

    updateTheme(color) {
        return () => {
            this.store.updateTheme(color);
        }
    }

    render() {
        return <ThemePicker updateTheme={this.updateTheme.bind(this)}/>
    }
}