import React from 'react';
import AppDrawer from './modules/Dashboard/modules/AppDrawer'
import {observer} from 'mobx-react'
import Dashboard from "./modules/Dashboard";

const App = observer(props =>
    (
        <div className={props.classes.app}>
            <Dashboard/>
        </div>
    ));

export default App;

