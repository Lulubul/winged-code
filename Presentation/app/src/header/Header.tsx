
import * as React from 'react';
import { Toolbar, AppBar, Typography, Paper, Tabs, Tab } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { teal } from 'material-ui/colors';

const styles = {
  root: {
    width: '100vw'
  },
  appBar: {
    backgroundColor: teal[400]
  },
  title: {
    color: '#fff',
  },
};

interface HeaderState {
  pathName: string;
}

// tslint:disable-next-line:no-any
interface HeaderProps extends RouteComponentProps<any> {
}

class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = { pathName: this.props.location.pathname};
  }

  render() {
    return (
      <header style={styles.root}>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar>
            <Typography type="display3" style={styles.title}>Winged Code</Typography>
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

export default withRouter(Header);
