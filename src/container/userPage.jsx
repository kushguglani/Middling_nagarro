import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
    Header, Image, Button, Label, Icon
} from 'semantic-ui-react'

import Home from './home'

import {
    fetchUser,
} from "../redux/action/feed";

import {
    followUser,
} from "../redux/action/feed";

export class FeedPage extends Component {
    state = { user: {}, }


    componentDidMount() {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        const path = this.props.location.pathname;
        const username = path.replace("/user/", "")
        fetchUser(header, username).then(res => {
            console.log(res);
            this.setState({
                user: res.data.profile
            })
        })
            .catch(err => {
                console.log("rdtyoipiuytryuiopliujh");
                console.log(err);
                console.log(err.response);
                this.props.history.push("/")

            })

    }
    componentDidUpdate() {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        const path = this.props.location.pathname;
        const username = path.replace("/user/", "")
        fetchUser(header, username).then(res => {
            console.log("rdtyoipiuytryuiopliujh");
            console.log(res);

            if (this.state.user.username !== res.data.profile.username) {
                this.setState({
                    user: res.data.profile
                })
            }
        })
            .catch(err => {
                this.props.history.push("/")
                console.log(err);
                console.log(err.response);

            })
    }
    followUser = () => {
        let header = {};
        if (this.props.userDetails.token) {
            header = {
                Authorization: "Token " + this.props.userDetails.token
            }

            let user = this.state.user.username;
            let method = this.state.user.following ? "DELETE" : "POST"
            followUser(header, user, method).then(res => {

                this.setState({
                    user: res.data.profile
                })

            })
                .catch(err => {

                    const errorCode = err.response;

                    const errorList = []
                    for (const error in errorCode) {
                        errorList.push(`${error} ${errorCode[error]}`)
                    }
                })
        } else {


        }
    }
    render() {
        const { user } = this.state;
        const path = this.props.location.pathname;
        const username = path.replace("/user/", "")
        const dataShowHidden = {
            popularTags: false,
            globalFeed: false,
            username
        }
        return (
            <div>
                <Header as='h2' icon textAlign='center' block>
                    {/* <Icon name='users' circular /> */}
                    <Image
                        circular
                        centered
                        size='large'
                        src={user.image}
                    />
                    <Header.Content>{user.username}</Header.Content>
                    <Header.Subheader>
                        {user.bio}
                    </Header.Subheader>
                </Header>
                <Header.Subheader align="right">
                    <Button align="right" as='div' labelPosition='right'
                        onClick={this.followUser}
                    >
                        <Button basic color={user.following ? "green" : "blue"}>
                            <Icon name='add user' />
                            {/* {follow}  */}
                            {user.following ? "UnFollow" : "Follow"}
                        </Button>
                        <Label as='a' basic color={user.following ? "green" : "blue"} pointing='left'>
                            {user.username}
                        </Label>
                    </Button>
                </Header.Subheader>
                {/* </Header> */}
                <Home dataShowHidden={dataShowHidden} />

            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.user.user,
})



export default withRouter(connect(mapStateToProps)(FeedPage))
