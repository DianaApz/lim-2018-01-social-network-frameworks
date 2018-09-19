import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import Upload from './fileImg.js'
import './App.css';


class App extends Component {

  constructor (){
    super();
    this.state = {
      user : null
    };
    this.Google= this.Google.bind(this);
    this.logOut = this.logOut.bind(this);
    this.LogGoogle = this.LogGoogle.bind(this);
  }

  componentWillMount (){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({user})
    })
  }

Google(){
   const provider = new firebase.auth.GoogleAuthProvider();

   firebase.auth().signInWithPopup(provider)
   .then(response=>console.log(`${response.user.email} ha iniciado sesión`))
   .catch((err=>console.log("${err.code} erro")))
}

Facebook(){
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(result=>{
    const token = result.credential.accessToken;
    const user = result.user;
    console.log(`${user} hola`)})
  .catch((err=>console.log("${err.code} erro")))
}

logOut(){
  firebase.auth().signOut()
  .then(result=>{})
  .catch((err=>console.log("${err.code} erro")))
}

LogGoogle(){
  if(this.state.user){
    return (
    <div>
    <Upload/>
      <p> hola {this.state.user.displayName}</p>
      <img width="30%" src={this.state.user.photoURL} />   
      <br/>
      <button onClick={this.logOut}>Cierra Sesión</button>
    </div>)
  }else {
    return(
      <div>
    <button onClick={this.Google}>Inicia Sesión con Google</button>
    <button onClick={this.Facebook}>Inicia Sesión con Facebook</button>
    </div>
  )
  }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to red social</h1>
          {this.LogGoogle()}
             </header>
      </div>
    );
  }}


export default App;
