
import * as React from 'react';
import { Toolbar, AppBar, Typography, Paper, Tabs, Tab } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { teal } from 'material-ui/colors';

const styles = {
  root: {
    width: '100%'
  },
  appBar: {
    backgroundColor: teal[400]
  },
  title: {
    color: '#fff',
  }
};

interface HeaderState {
  value: number;
}

// tslint:disable-next-line:no-any
interface HeaderProps extends RouteComponentProps<any> {
}

class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  public handleChange = (event: React.FormEvent<HTMLSelectElement>, value: number) => {
    this.setState({ value });
    switch (value) {
      case 0: this.props.history.push('/'); break;
      case 1: this.props.history.push('/articles'); break;
      case 2: this.props.history.push('/profile'); break;
      default:  this.props.history.push('/'); 
    }
  }

  render() {
    return (
      <header style={styles.root}>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar>
            <Typography type="display3" style={styles.title}>
              Winged Code
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={styles.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
          >
            <Tab value={0} label="Home"/>
            <Tab value={1} label="Articles"/>
            <Tab value={2} label="Profile"/>
          </Tabs>
        </Paper>
      </header>
    );
  }

}

export default withRouter(Header);
