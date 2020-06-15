import React, { Component } from 'react'
import {
  Divider,
  Grid,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {
  userLogin,
  userSignup
}
  from '../redux/action/user';
import Login from '../component/user/login';
import Signup from '../component/user/signup';
import { withRouter } from 'react-router-dom';
import {buttonConstant} from '../utils/userConstant'

class FormController extends Component {
  componentDidMount(){
    
    if(this.props.isUserLogin)  this.props.history.push(`/`)
  }
  componentDidUpdate(){
    
    if(this.props.isUserLogin)  this.props.history.push(`/`)
  }
  render() {
    const {signin,
      signup,
      or} = buttonConstant
    let { userLogin, userSignup, error } = this.props;
    // isUserLogin && 
    // this.props.history.push(`/${this.state.activeItem}`)
    return (
      <>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>{or}</Divider>

            {/* <Grid.Row verticalAlign='middle'> */}
            <Grid.Row >
              <Grid.Column>
                <Header >
                  {signin}
          </Header>
                <Login userLogin={(data) => userLogin(data)} />
              </Grid.Column>

              <Grid.Column>
                <Header >
                  {signup}
          </Header>
                <Signup userSignup={(data) => userSignup(data)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment >
        {error.length > 0 && <Message
          visible
          error
          header='There was some errors with your submission'
          list={
            error
          }
        />

        }
      </>
    )
  }
}

function initMapStateToProps(state) {
  return {
    error: state.user.error,
    isUserLogin: state.user.isUserLogin,
    
  }
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    userLogin,
    userSignup
  }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(FormController));