import * as React from 'react';
import { Grid, Typography } from 'material-ui';

export default class Home extends React.Component {
  render() {
    return (
      <Grid container={true} justify={'center'}>
        <Grid item={true} style={{ padding: 20 }}>
          <Typography>Welcome to Winged Code!</Typography>
        </Grid>
      </Grid>
    );
  }
}
