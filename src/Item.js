import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  height: 280,
  width: 280,
  margin:20,
  textAlign: 'center',
};


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
    e.preventDefault();
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



export default Item;
