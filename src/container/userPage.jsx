import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import {
    Segment, Container, Comment, Menu,
    Icon, Label, Form, Button, Header, Image
} from 'semantic-ui-react'

import { daysAgo } from '../services/helperFunction'
import {
    fetchArticleBySlag,
    fetchCommnetsBySlag,
    addCommentToArticle,
    deleteCommentToArticle,
    favoriteArticleFeedPage,
    followUser,
    fetchUser,
    fetchConditionalFeeds
} from "../redux/action/feed";
import Spinner from '../component/loader'
import Feeds from '../component/feed/feeds'


export class FeedPage extends Component {
    state = { article: {}, comments: [], user: {}, body: "", disabled: true, username: "", activeIndex: "author" }


    componentDidMount() {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        const path = this.props.location.pathname;
        const username = path.replace("/user/", "")
        console.log(username);

        fetchUser(header, username).then(res => {
            console.log(res);
            this.setState({
                user: res.data.profile,
                username
            })
        })
        this.props.fetchConditionalFeeds(this.state.activeIndex, username, 0, header)
    }
    fetchFeeds = (e, { name }) => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        this.setState({
            activeIndex: name
        }, () => {
            this.props.fetchConditionalFeeds(this.state.activeIndex, this.state.username, 0, header)
        })
    }

    render() {
        const { user, activeIndex } = this.state;
        const { feedLoader, feeds, fetchConditionalFeeds } = this.props;
        let header;
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
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
                <Menu pointing>
                    <Menu.Item
                        name='author'
                        active={activeIndex === 'author'}
                        onClick={this.fetchFeeds}
                    >

                        <Icon name='user' />
                        {user.username} Feed
                    </Menu.Item>
                    <Menu.Item
                        name='favorited'
                        // className={isUserLogin ? "" : "displayNone"}
                        active={activeIndex === 'favorited'}
                        onClick={this.fetchFeeds}

                    >
                        <Icon name='heart' />

                        Favorited Feeds
                    </Menu.Item>
                </Menu>
                {
                    feedLoader ?
                        <Spinner text="Fetching Feeds" /> : <Feeds
                            //  userClicked={userClicked}
                            feeds={feeds}
                        //   favoriteArticle={favoriteArticle}
                        />
                }

            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.user.user,
    feeds: state.userFeeds.feeds,
    feedLoader: state.userFeeds.feedLoader,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchArticleBySlag,
        fetchConditionalFeeds
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedPage))
