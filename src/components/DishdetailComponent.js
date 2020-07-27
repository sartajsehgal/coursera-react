import React,{ Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb,Button,
    Modal,ModalHeader,ModalBody,ModalFooter,Row,Label, Input, Col
  } from 'reactstrap';
  import {Link} from 'react-router-dom';
import { LocalForm,Control,Errors } from 'react-redux-form';

function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}) {
        if(comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </ul>
                </div>
            );
        }

        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len );
        const minLength = (len) => (val) => (val) && (val.length >= len );

class CommentForm extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            show: false
        };
    }

    handleSubmit(values) {
        this.toggle();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment );
    }

    toggle() {
        this.setState({show:!this.state.show})
    }

    render() { 
        return ( 
            <div>
                <Button onClick={this.toggle} outline color="secondary"><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.show}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                <Row className="form-group">
                                    <Label htmlFor="rating" >Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                        <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages = {{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row classname="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id='comment' name="comment"
                                        rows={6}
                                        className="form-control"/>
                                </Row>
                                <Row className="form-group mt-2">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                    
                </Modal>
            </div>
         );
    }
}
            
        const  DishDetail = (props) => {
                if(props.dish != null)
                return (
                    <div className="container">
                        <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        </div>
                        <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id} />
    
                        </div>
                    </div>
                );
                else
                    return(
                        <div></div>
                    );
          }           

 
export default DishDetail;