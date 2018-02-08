import React, { Component } from 'react';
import './App.css';
// import firebase, { auth, provider} from './firebase.js';
import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';


const style = {
  height: 280,
  width: 280,
  margin:20,
  textAlign: 'center',
};

class PostBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      user:'',
      major:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e){
      e.preventDefault();
      let dbBooks = this.props.db.database().ref('/books');
      dbBooks.push({
        title: this.state.title,
        user: this.props.user.displayName,
        major: this.state.major,
        url: this.props.user.photoURL
      });
      this.setState({
        title: '',
        user: '',
        major: ''
      });
    }

  render(){
    return(
      <Card style={style}>
          <form onSubmit={this.onSubmit}>
            <TextField
              hintText="Enter Book Title"
              floatingLabelText="Book Title"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            /><br />
            <TextField
              hintText="Major"
              floatingLabelText="For what Major"
              name="major"
              onChange={this.onChange}
              value={this.state.major}
            /><br />
            <FlatButton label="Post book" fullWidth={true} onClick={this.onSubmit} />
          </form>
       </Card>
    )
  }


}

class Item extends Component{
  constructor(props){
    super(props);
    this.state = {
      item : props.item,
      user : props.user,
      db: props.db
    }
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(e){
  e.preventDefault;
  let itemRef = this.state.db.database().ref(`/books/${this.props.item.id}`);
  itemRef.remove();
  }


  componentDidMount(){
    console.log(this.props.item);
  }

  render(){
    return(
      <Card style={style}>
        <CardHeader
          title={this.state.item.user}
          subtitle="SJSU"
          avatar={this.state.item.url}
          />
        <CardTitle title={this.state.item.title} subtitle={this.state.item.major} />
        <CardActions>
          <FlatButton label="Interested" />
          <FlatButton label="WishList" />
          {
            this.props.user ?
              this.props.user.displayName === this.state.item.user ?
              <FlatButton label="Delete" onClick={this.removeItem}  />
              :
              null
            :
            null
          }
        </CardActions>
      </Card>
    )
  }
}



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      items:[]
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
    })

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
         iconElementRight={<FlatButton onClick={this.logout} label="Log Out" />}
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
