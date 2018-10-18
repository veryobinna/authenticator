import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import Config from './config';

export default class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    let config = {
      apiKey: Config.API_KEY,
      authDomain: Config.AUTH_DOMAIN,
      databaseURL: Config.DATABASE_URL,
      projectId: Config.PROJECT_ID,
      storageBucket: Config.STORAGE_BUCKET,
      messagingSenderId: Config.MESSAGING_SENDER
    };

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderComponent() {
    if (this.state.loggedIn) {
      return (<Button
        title="Sign out"
        onPress={() => firebase.auth().signOut()} />)
    } else {
      return (
        <LoginForm />
      )
    }
  }
  render() {
    return (
      <View>
        <Header title='Authenticator' />
        {this.renderComponent()}
      </View>
    );
  }
}
