import React from 'react';
import Progress from 'material-ui/Progress/CircularProgress'


export const Loading = props => (
    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
        <Progress style={{flex: `${(props.size / 100) || 0} 1 auto`}}
                  size={72}/>
        <Progress color="secondary" style={{flex: `${(props.size / 100) || 0} 1 auto`}}
                  size={72}/>
    </div>
);