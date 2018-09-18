import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch , Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchleaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments : state.comments,
    leaders : state.leaders,
    promotions : state.promotions
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment:(dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchleaders: () => {dispatch(fetchleaders())}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchleaders(); 
  }
  render() {
     const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading= {this.props.promotions.isLoading}
                promosErrMess = {this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrmess = {this.props.leaders.errMess}
            />
        );
      }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading = {this.props.dishes.isLoading} 
          errMess = {this.props.dishes.errMess}
          comments= {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentserrMess = {this.props.comments.errMess}
          commentsisLoading = {this.props.comments.isLoading}
          postComment = {this.props.postComment}
        />
      );
    }

    return (
        <div>
          <Header />
          <Switch>
            <Route  path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
            <Redirect to="/home" /> 
          </Switch>
          <Footer />
        </div>     
    );  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));