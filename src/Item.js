import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: 300,
  width: 280,
  margin:20,
  textAlign: 'center',
};

const buttonStyle = {
  margin: 10
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
        <CardTitle title={this.state.item.title} subtitle={this.state.item.major + " price " + this.state.item.price} />
        <CardActions>
          <RaisedButton label="Interested" primary = "true"/>
          <RaisedButton label="WishList" primary = "true"/>
          {
            this.props.user ?
              this.props.user.displayName === this.state.item.user ?
              <RaisedButton label="Delete" onClick={this.removeItem} secondary={true} style = {buttonStyle}/>
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
