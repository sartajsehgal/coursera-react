import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderComments(dish) {
        if(dish!=null){
            const comment = dish.comments.map((remark) => {
                return(
                    <div>
                        <ul key={remark.id} className="list-unstyled">
                            <li>{remark.comment}</li>
                            <li>--{remark.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric' , month: 'short', day: '2-digit'}).format(new Date(Date.parse(remark.date)))}</li>
                        </ul>
                    </div>
                )
            }
            );
           return(
               <div>
                   <h4>Comments</h4>
                   {comment}
               </div>
           )
            };
        }


    renderDish(dish) {
        if (dish != null)
            return(
                <div>
                        <div className="col-12">
                            <Card>
                                <CardImg top src={dish.image} alt={dish.name} />
                                <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
            );
        else
            return(
                <div></div>
            );
    }

    render() { 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div> 
            </div>
                
            
          );
    }
}
 
export default DishDetail;