import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
    this.Google = this.Google.bind(this);
    this.Facebook = this.Facebook.bind(this);
    this.logOut = this.logOut.bind(this);
    this.LoginGeneral = this.LoginGeneral.bind(this);
    this.writeUserData=this.writeUserData.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      
    })
  }
  writeUserData(userId, email, name,img) {
    const database = firebase.database();
    firebase.database().ref('user/' + userId + '/').set({
      username: name,
      email: email,
      profile_picture : img,
    });
  }

  Google() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        this.writeUserData(res.user.uid,res.user.email,res.user.displayName,res.user.photoURL)
      })
      .catch((err => console.log(`${err.code} erro`)
      ));
  }

  Facebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        // const token = result.credential.accessToken;
        this.writeUserData(res.user.uid,res.user.email,res.user.displayName,res.user.photoURL)
      })
      .catch((err => console.log(`${err.code} erro`)))
  }

  logOut() {
    firebase.auth().signOut()
      .then(result => { })
      .catch((err => console.log(`${err.code} erro`)))
  }

  LoginGeneral() {
    if (this.state.user) {
      // this.writeUserData(state.user.uid,state.user.email,state.user.displayName,state.user.photoURL)
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.photoURL} />
          <p> hola {this.state.user.displayName}</p>
          <button onClick={this.logOut}>Cierra Sesión</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.Google}>Inicia Sesión con Google</button>
          <button onClick={this.Facebook}>Inicia Sesión con Facebook</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to red social</h1>
        </header>
        <div className="App-intro">
          {this.LoginGeneral()}
        </div>



      </div>
    );
  }
}


export default App;
