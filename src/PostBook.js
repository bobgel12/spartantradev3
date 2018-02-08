import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';

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


export default PostBook ;
