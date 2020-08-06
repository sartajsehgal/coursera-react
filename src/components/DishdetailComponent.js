import React,{ Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb,Button,
    Modal,ModalHeader,ModalBody,Row,Label, Input, Col
  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm,Control,Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in 
                transformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({comments, postComment, dishId}) {
        if(comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return(
                                    <Fade in>
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        </li>
                                    </Fade>  
                                );
                            })}
                        </Stagger>
                        <CommentForm dishId={dishId} postComment={postComment} />
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment );
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
            if(props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if(props.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
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
                                postComment={props.postComment}
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