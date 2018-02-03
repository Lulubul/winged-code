import * as React from 'react';
import { Grid, Typography } from 'material-ui';

class Profile extends React.Component {
    render() {
        return (
            <Grid container={true} xs={12} justify={'center'}>
                <Grid item={true} style={{ padding: 20 }}>
                    <Typography>Hello I'm Daniel and this is my website</Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Profile;
