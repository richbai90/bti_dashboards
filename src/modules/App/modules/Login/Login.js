import React from 'react';
import {observer} from 'mobx-react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const Login = props => (

    <div className={props.classes.loginWrapper}>
        <form className={props.classes.login}>
            <TextField id="username" label="username" value={props.username} required
                       onChange={props.onChange('username')}/>
            <TextField id="password" label="password" type="password" value={props.password}
                       onChange={props.onChange('password')} required/>
            <Button onClick={props.onSubmit} variant="raised" color="primary">
                Login
            </Button>
        </form>
    </div>
);

export default observer(Login);