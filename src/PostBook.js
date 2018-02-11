import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

const style = {
  height: 300,
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
      price:'',
      major:'',
      description: ''
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
        major: this.state.major,
        price: this.state.price,
        description: this.state.description,
        user: this.props.user.displayName,
        url: this.props.user.photoURL
      });
      this.setState({
        title: '',
        major: '',
        price: '',
        description:''
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
            <TextField
              hintText="Price"
              floatingLabelText="How much do you want to sell for?"
              name="price"
              onChange={this.onChange}
              value={this.state.price}
            /><br />
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              onChange={this.onChange}
              value={this.state.description}
            /><br />
          <RaisedButton label="Post book" fullWidth={true} onClick={this.onSubmit} primary = "true"/>
          </form>
       </Card>
    )
  }
}


export default PostBook ;
