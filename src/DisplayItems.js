import React, {Component} from 'react';
import PostBook from './PostBook.js';
import Item from './Item.js';


class DisplayItems extends Component {
  render(){
    return(
      <div className= "container">
        <div className="row">
          {
            this.props.user ?
            <div className="col-xs-12 col-md-6 col-lg-4">
                  <PostBook db={this.props.firebase} user={this.props.user}/>
            </div>
            :
            null
          }
            {
              this.props.items.map((item) => {
                return (
                  <div className="col-xs-12 col-md-6 col-lg-4" key={item.id}>
                    <Item item = {item} user = {this.props.user} db={this.props.firebase}/>
                  </div>
                )
              })
            }
        </div>
      </div>
    )
  }
}


export default DisplayItems;
