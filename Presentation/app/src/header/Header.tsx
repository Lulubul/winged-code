
import * as React from 'react';
import { Toolbar, AppBar, Typography, Paper, Tabs, Tab } from 'material-ui';
import { RouteComponentProps, withRouter } from 'react-router';
import { teal } from 'material-ui/colors';
import { StyleRules } from 'material-ui/styles';

const styles: StyleRules  = {
  root: {
    width: '100vw'
  },
  appBar: {
    backgroundColor: teal[400]
  },
  title: {
    color: '#fff',
    textAlign: 'center'
  },
};

interface HeaderState {
  pathName: string;
}

interface HeaderProps {
}

class Header extends React.Component<RouteComponentProps<HeaderProps>, HeaderState> {

  constructor(props: RouteComponentProps<HeaderProps>) {
    super(props);
    this.state = { pathName: this.props.location.pathname};
  }

  render() {
    return (
      <header style={styles.root}>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar>
            <Typography variant="display3" style={styles.title}>Winged Code</Typography>
          </Toolbar>
        </AppBar>
        <Paper style={styles.root}>
          <Tabs
            value={this.state.pathName}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
          >
            <Tab value={'/'} label="Home"/>
            <Tab value={'/articles'} label="Articles"/>
            <Tab value={'/profile'} label="Profile"/>
          </Tabs>
        </Paper>
      </header>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLSelectElement>, newPath: string) => {
    if (this.props.location.pathname === newPath) {
      return;
    }
    this.setState({ pathName: newPath });
    this.props.history.push(newPath);
  }

}

// tslint:disable-next-line:no-any
export default withRouter<RouteComponentProps<HeaderProps>>(Header as any);
