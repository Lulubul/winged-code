import * as React from 'react';
import './App.css';
import Main from './navigation/Main';
import Header from './header/Header';
import * as firebase from 'firebase';
require('firebase/firestore');

const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: 'winged-code',
  storageBucket: 'winged-code.appspot.com',
};

class App extends React.Component {

  constructor(props: {}) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render(): JSX.Element {
    return (
      <>
        <Header/>
        <Main/>
      </>
    );
  }
}

export default App;
