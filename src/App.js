import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import PostBook from './PostBook.js';
import Item from './Item.js';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      items:[]
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  getData(values){
    let newState = [];
    for (let item in values){
      newState.push({
        id: item,
        title: values[item].title,
        user: values[item].user,
        major: values[item].major,
        url: values[item].url,
      })
    }
    this.setState({
      items: newState
    })
  }

  logout(){
    this.auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login(){
    this.auth.signInWithPopup(this.provider)
    .then((result) => {
      const user = result.user;
      this.setState({user});
    });
  }


  componentDidMount() {

    const config = {
      apiKey: "AIzaSyCuRETZyaUdJV2eH36781iTl93xz2_Gr-w",
      authDomain: "spantantrade.firebaseapp.com",
      databaseURL: "https://spantantrade.firebaseio.com",
      projectId: "spantantrade",
      storageBucket: "spantantrade.appspot.com",
      messagingSenderId: "697800608507"
    };
    firebase.initializeApp(config);
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.auth = firebase.auth();
    let dbBooks = firebase.database().ref('/books');
    dbBooks.on('value', snapshot => {
      this.getData(snapshot.val());
    });

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
       {
         this.state.user ?
         <AppBar
         title="SpartanTrade"
         iconElementRight={
           <List>
             <ListItem
                disabled={true}
                children={
                  <div>
                    <Avatar src={this.state.user.photoURL} />
                    <FlatButton onClick={this.logout} label="Log Out" />
                  </div>
                }
               />

           </List>
         }
         user={this.state.user}
         />
         :
         <AppBar
         title="SpartanTrade"
         iconElementRight={<FlatButton onClick={this.login} label="Log in" />}
         />
       }
        <div className= "container">
          <div className="row">
            {
              this.state.user ?
              <div className="col-xs-12 col-md-6 col-lg-4">
                    <PostBook db={firebase} user={this.state.user}/>
              </div>
              :
              null
            }
              {
                this.state.items.map((item) => {
                  return (
                    <div className="col-xs-12 col-md-6 col-lg-4" key={item.id}>
                      <Item item = {item} user = {this.state.user} db={firebase}/>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
