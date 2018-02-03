import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';
import Home from '../home/Home';
import Articles from '../articles/Articles';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/articles" component={Articles} />
                <Route path="/profile" component={Profile} />
            </Switch>
        );
    }
}

export default Main;