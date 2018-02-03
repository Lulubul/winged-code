import * as React from 'react';
import './App.css';
import Main from './navigation/Main';
import Header from './header/Header';

class App extends React.Component {
  // tslint:disable-next-line:no-any
  render(): any {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
